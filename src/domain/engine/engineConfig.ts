export const SequenceMode = {
	RANDOM: "random",
} as const;

export type SequenceMode =
	(typeof SequenceMode)[keyof typeof SequenceMode];

export type SequenceConfig = {
	chapters: number[]
	mode?: SequenceMode
}

export type StoryConfig = {
	startChapterId: number;
	endChapterIds: number[];
	maxNumberOfChapters: number;
	randomChapterPool: readonly number[];
	chapterSequences: Record<number, SequenceConfig>
}