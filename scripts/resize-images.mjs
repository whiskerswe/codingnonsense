import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./scripts/tenniel-original/tenniel-original";
const OUTPUT_DIR = "src/assets/tenniel";
const MAX_WIDTH = 650;
const QUALITY = 65;

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true});
    }

const files = fs.readdirSync(INPUT_DIR).filter(f =>
    f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".jpeg")
    );

for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);

    console.log(`Processing ${file}...`);

    await sharp(inputPath)
        .resize({width: MAX_WIDTH, withoutEnlargment: true})
        .jpeg({quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4"})
        .toFile(outputPath);
    }

console.log("✓ Image resize complete");