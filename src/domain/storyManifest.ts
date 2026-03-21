import type { StoryConfig } from "./storyEngine.ts";

export const storyManifest = {
	start: 3,
	ending: 22,
	randomPool: [0, 1, 2, 4, 7, 13, 14, 21, 39],
	sequences: new Map([
		[7, 6],
		[22, 23],
	]),
}  satisfies StoryConfig;

export const usedChapterIds = Array.from(
	new Set([
		storyManifest.start,
		storyManifest.ending,
		...storyManifest.randomPool,
		...storyManifest.sequences.keys(),
		...storyManifest.sequences.values(),
	])
);
