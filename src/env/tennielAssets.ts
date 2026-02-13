import { usedChapterIds } from "../domain/storyManifest.ts";

const modules = import.meta.glob(
	"../assets/tenniel/*.jpg",
	{ eager: true, import: "default" }
);

export const images: Record<string, string> = {};

for (const [path, src] of Object.entries(modules)) {
	const match = path.match(/(\d+)\.jpg$/);
	if (!match) continue;
	
	const id = Number(match[1]);
	
	if (usedChapterIds.includes(id)) {
		images[id] = src as string;
	}
}