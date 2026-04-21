import type { StoryConfig } from "./storyEngine.ts";

export const storyManifest = {
	start: 3,
	ending: 22,
	randomPool: [0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 19, 21, 24, 33, 39],
	sequences: new Map([
		[7, 6],
		[22, 23],
		[24, 25],
		[25, 26],
		[33, 17],
		[17, 16],
		[16, 15],
		[15, 18],
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
