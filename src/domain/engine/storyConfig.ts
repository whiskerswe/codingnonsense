import { SequenceMode, type StoryConfig } from "./engineConfig.ts";
export const storyConfig = {
	startChapterId: 3,
	endChapterIds: [22, 23],
	maxNumberOfChapters: 7,
	randomChapterPool: [0, 1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 19,
		20, 21, 24, 27, 28, 30, 33, 35, 36, 37, 38, 39],
	chapterSequences: {
		7: { chapters: [6] },
		24: { chapters: [25, 26], mode: SequenceMode.RANDOM },
		25: { chapters: [24, 26], mode: SequenceMode.RANDOM },
		26: { chapters: [24, 25], mode: SequenceMode.RANDOM },
		29: { chapters: [31] },
		33: { chapters: [17, 16, 15, 18, 34] },
		39: { chapters: [41] },
	}
}  as const satisfies StoryConfig;

