export type SequenceConfig = {
	chapters: number[]
	mode?: 'ordered' | 'random'
}

export type StoryConfig = {
	start: number;
	ending: number[];
	numberOfChapters: number;
	randomPool: readonly number[];
	sequences: ReadonlyMap<number, SequenceConfig>;
}
//Missing chapters [20, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 40, 41]
export const storyManifest = {
	start: 3,
	ending: [22, 23],
	numberOfChapters: 7,
	randomPool: [0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 19, 21, 24, 33, 39],
	sequences: new Map([
		[7, { chapters: [6] }],
		[24, { chapters: [25, 26], mode: 'random' }],
		[25, { chapters: [24, 26], mode: 'random' }],
		[26, { chapters: [24, 25], mode: 'random' }],
		[33, { chapters: [17, 16, 15, 18, 34], mode: 'ordered' }],
	])
}  satisfies StoryConfig;

export const usedChapterIds = Array.from(
	new Set([
		storyManifest.start,
		...storyManifest.ending,
		...storyManifest.randomPool,
		...storyManifest.sequences.keys(),
		...Array.from(storyManifest.sequences.values()).flatMap(sequence => sequence.chapters),
	])
);
