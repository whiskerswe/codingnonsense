import { afterEach, expect, it, vi } from "vitest";
import { SequenceMode, type StoryConfig } from "./engineConfig.ts";
import { StoryEngine } from "./storyEngine.ts";


const base = defaultConfig();
const START = base.startChapterId;
const FIRST_ENDING = base.endChapterIds[0];
const LAST_ENDING = base.endChapterIds[1];
const SEQUENCE_FROM_7 = base.chapterSequences[7]!;

afterEach(() => {
	vi.restoreAllMocks();
});

function defaultConfig(): StoryConfig {
	return {
		startChapterId: 3,
		endChapterIds: [22, 23],
		maxNumberOfChapters: 10,
		randomChapterPool: [4, 5, 7],
		chapterSequences: {
			7: { chapters: [6] },
		},
	};
}

function createEngine(overrides: Partial<StoryConfig> = {}) {
	const config: StoryConfig = {
		startChapterId: overrides.startChapterId ?? START,
		endChapterIds: overrides.endChapterIds ?? base.endChapterIds,
		maxNumberOfChapters:
			overrides.maxNumberOfChapters ?? base.maxNumberOfChapters,
		randomChapterPool: overrides.randomChapterPool ?? base.randomChapterPool,
		chapterSequences: overrides.chapterSequences ?? base.chapterSequences,
	};

	const engine = new StoryEngine(config);
	engine.currentChapter = config.startChapterId;
	return engine;
}

it.each([
	{
		name: "goes to ending when pool is empty",
		randomChapterPool: [],
		expectExact: FIRST_ENDING,
	},
	{
		name: "random chapter must come from pool",
		expectIn: base.randomChapterPool,
		expectNotIn: [22, 6],
	},
	{
		name: "random chapter must not be in consumedPoolEntries",
		consumedPoolEntries: new Set([4, 5]),
		expectIn: [7],
		expectNotIn: [4, 5],
	},
])(
	"$name",
	({
		randomChapterPool,
		consumedPoolEntries,
		expectExact,
		expectIn,
		expectNotIn,
	}) => {
		const engine = createEngine({
			randomChapterPool,
		});

		consumedPoolEntries?.forEach((chapterId) => {
			engine.consumedPoolEntries.add(chapterId);
		});

		const result = engine.nextChapter();

		if (expectExact !== undefined) {
			expect(result).toBe(expectExact);
		}

		if (expectIn) {
			expect(expectIn).toContain(result);
		}

		if (expectNotIn) {
			expect(expectNotIn).not.toContain(result);
		}
	}
);

it("queues sequence chapters after landing on a sequence start", () => {
	const engine = createEngine({
		randomChapterPool: [7],
	});

	expect(engine.nextChapter()).toBe(7);
	expect(engine.nextChapter()).toBe(SEQUENCE_FROM_7.chapters[0]);
});

it("queues ordered sequence chapters in sequence order", () => {
	const engine = createEngine({
		randomChapterPool: [24],
		chapterSequences: {
			24: { chapters: [25, 26] },
		},
	});

	expect(engine.nextChapter()).toBe(24);
	expect(engine.nextChapter()).toBe(25);
	expect(engine.nextChapter()).toBe(26);
});

it("queues a random subset from the sequence key and chapter values with at least two chapters", () => {
	vi.spyOn(Math, "random")
		.mockReturnValueOnce(0)
		.mockReturnValueOnce(0.99)
		.mockReturnValueOnce(0.99)
		.mockReturnValueOnce(0);

	const engine = createEngine({
		maxNumberOfChapters: 20,
		randomChapterPool: [24],
		chapterSequences: {
			24: { chapters: [25, 26], mode: SequenceMode.RANDOM },
		},
	});

	expect(engine.nextChapter()).toBe(24);
	expect(engine.nextChapter()).toBe(25);
	expect(engine.nextChapter()).toBe(FIRST_ENDING);
});

it("draws from the random pool while fewer than numberOfChapters have been read", () => {
	const engine = createEngine({
		maxNumberOfChapters: 2,
		randomChapterPool: [4],
	});

	expect(engine.nextChapter()).toBe(4);
});

it("goes to the ending once numberOfChapters have been read", () => {
	const engine = createEngine({
		maxNumberOfChapters: 1,
		randomChapterPool: [4],
	});

	expect(engine.nextChapter()).toBe(FIRST_ENDING);
});

it("advances through the ending queue when the story is exhausted", () => {
	const engine = createEngine({
		maxNumberOfChapters: 1,
		randomChapterPool: [4],
	});

	expect(engine.nextChapter()).toBe(FIRST_ENDING);
	expect(engine.nextChapter()).toBe(LAST_ENDING);
});
