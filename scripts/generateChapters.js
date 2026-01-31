import fs from "fs";
import path from "path";

const IMAGE_DIR = "../public/tenniel";
const OUTPUT_FILE = "./chapters.json";

const files = fs
    .readdirSync(IMAGE_DIR)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const chapters = files.map(file => {
    const id = path.parse(file).name;

    return {
        id,
        image: file,
        characters: [],
        sentences: {
            observe: "",
            uncertainty: "",
            misreflection: "",
            response: "",
            exit: ""
        }
    };
});

fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(chapters, null, 2),
    "utf-8"
);

console.log(`Created ${chapters.length} chapters in ${OUTPUT_FILE}`);
