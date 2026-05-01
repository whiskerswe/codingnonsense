import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const chaptersDir = path.join(rootDir, "src", "assets", "data", "chapters");
const imagesDir = path.join(rootDir, "src", "assets", "images", "chapters");

const imageExtensions = [".webp", ".png", ".jpg", ".jpeg"];

function readUInt24LE(buffer, offset) {
	return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function getWebpDimensions(buffer) {
	if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
		throw new Error("Not a WebP file");
	}

	let offset = 12;
	while (offset + 8 <= buffer.length) {
		const chunkType = buffer.toString("ascii", offset, offset + 4);
		const chunkSize = buffer.readUInt32LE(offset + 4);
		const chunkStart = offset + 8;

		if (chunkType === "VP8X") {
			return {
				width: readUInt24LE(buffer, chunkStart + 4) + 1,
				height: readUInt24LE(buffer, chunkStart + 7) + 1,
			};
		}

		if (chunkType === "VP8 ") {
			return {
				width: buffer.readUInt16LE(chunkStart + 6) & 0x3fff,
				height: buffer.readUInt16LE(chunkStart + 8) & 0x3fff,
			};
		}

		if (chunkType === "VP8L") {
			const b1 = buffer[chunkStart + 1];
			const b2 = buffer[chunkStart + 2];
			const b3 = buffer[chunkStart + 3];
			const b4 = buffer[chunkStart + 4];
			return {
				width: 1 + (((b2 & 0x3f) << 8) | b1),
				height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)),
			};
		}

		offset = chunkStart + chunkSize + (chunkSize % 2);
	}

	throw new Error("Could not find a WebP dimensions chunk");
}

function getPngDimensions(buffer) {
	if (buffer.toString("hex", 0, 8) !== "89504e470d0a1a0a") {
		throw new Error("Not a PNG file");
	}

	return {
		width: buffer.readUInt32BE(16),
		height: buffer.readUInt32BE(20),
	};
}

function getJpegDimensions(buffer) {
	if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
		throw new Error("Not a JPEG file");
	}

	let offset = 2;
	while (offset < buffer.length) {
		if (buffer[offset] !== 0xff) {
			offset++;
			continue;
		}

		const marker = buffer[offset + 1];
		const length = buffer.readUInt16BE(offset + 2);
		if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
			return {
				height: buffer.readUInt16BE(offset + 5),
				width: buffer.readUInt16BE(offset + 7),
			};
		}

		offset += 2 + length;
	}

	throw new Error("Could not find a JPEG dimensions marker");
}

function getImageDimensions(imagePath) {
	const buffer = fs.readFileSync(imagePath);
	const extension = path.extname(imagePath).toLowerCase();

	if (extension === ".webp") return getWebpDimensions(buffer);
	if (extension === ".png") return getPngDimensions(buffer);
	if (extension === ".jpg" || extension === ".jpeg") return getJpegDimensions(buffer);

	throw new Error(`Unsupported image type: ${extension}`);
}

function findImageForChapter(chapterId) {
	for (const extension of imageExtensions) {
		const imagePath = path.join(imagesDir, `${chapterId}${extension}`);
		if (fs.existsSync(imagePath)) return imagePath;
	}

	return null;
}

function upsertFrontmatterValue(frontmatter, key, value, afterKey) {
	const lines = frontmatter.split(/\r?\n/);
	const existingIndex = lines.findIndex((line) => line.startsWith(`${key}:`));
	const nextLine = `${key}: ${value}`;

	if (existingIndex >= 0) {
		lines[existingIndex] = nextLine;
		return lines.join("\n");
	}

	const afterIndex = lines.findIndex((line) => line.startsWith(`${afterKey}:`));
	lines.splice(afterIndex >= 0 ? afterIndex + 1 : lines.length, 0, nextLine);
	return lines.join("\n");
}

function removeFrontmatterValues(frontmatter, keys) {
	const keySet = new Set(keys);
	return frontmatter
		.split(/\r?\n/)
		.filter((line) => {
			const [key] = line.split(":", 1);
			return !keySet.has(key);
		})
		.join("\n");
}

function updateMarkdownDimensions(markdown, width, height) {
	const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) {
		throw new Error("Markdown file has no frontmatter block");
	}

	const frontmatter = removeFrontmatterValues(match[1], ["width", "height"]);
	let nextFrontmatter = upsertFrontmatterValue(frontmatter, "image_width", width, "image");
	nextFrontmatter = upsertFrontmatterValue(nextFrontmatter, "image_height", height, "image_width");

	return markdown.replace(match[0], `---\n${nextFrontmatter}\n---`);
}

const chapterFiles = fs
	.readdirSync(chaptersDir)
	.filter((file) => path.extname(file).toLowerCase() === ".md")
	.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let updated = 0;
let skipped = 0;

for (const chapterFile of chapterFiles) {
	const chapterId = path.basename(chapterFile, ".md");
	const imagePath = findImageForChapter(chapterId);
	if (!imagePath) {
		console.warn(`Skipping ${chapterFile}: no matching image found`);
		skipped++;
		continue;
	}

	const { width, height } = getImageDimensions(imagePath);
	const markdownPath = path.join(chaptersDir, chapterFile);
	const markdown = fs.readFileSync(markdownPath, "utf8");
	const nextMarkdown = updateMarkdownDimensions(markdown, width, height);

	if (nextMarkdown !== markdown) {
		fs.writeFileSync(markdownPath, nextMarkdown, "utf8");
		updated++;
	}
}

console.log(`Updated ${updated} chapter files. Skipped ${skipped}.`);
