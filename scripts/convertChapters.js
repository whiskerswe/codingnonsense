import fs from "fs";
import path from "path";

const inputFile = "../src/data/chapters.json";      // din JSON-lista
const outputDir = "../src/data/chapters";   // där markdown ska hamna

const chapters = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}
let index = 0;
chapters.forEach((chapter) => {
	const { id, image, characters, sentences } = chapter;

	const frontmatter = [
		"---",
		`id: ${id}`,
		`image: ${image}`,
		"characters:",
		...characters.map((c) => `  - ${c}`),
		"---",
		"",
	].join("\n");

	const text = Object.values(sentences)
		.map((s) => `${s}\n`)
		.join("\n");

	const markdown = frontmatter + text;
	const number = String(++index).padStart(3, "0")
	const filename = path.join(outputDir, `${number}.md`);

	fs.writeFileSync(filename, markdown);
	console.log(`Created ${filename}`);
});