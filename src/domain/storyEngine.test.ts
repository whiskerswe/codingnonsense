import { afterEach, expect, it, vi } from "vitest";
import { StoryEngine } from "./storyEngine.js";
import type { StoryConfig } from "./storyManifest.js";


const base = defaultConfig();
const START = base.start;
const FIRST_ENDING = base.ending[0];
const LAST_ENDING = base.ending[1];
const SEQUENCE_FROM_7 = base.sequences.get(7)!;

afterEach(() => {
	vi.restoreAllMocks();
});

function defaultConfig(): StoryConfig {
	return {
		start: 3,
		ending: [22, 23],
		numberOfChapters: 10,
		randomPool: [4, 5, 7],
		sequences: new Map([
			[7, { chapters: [6] }],
		]),
	};
}

function createEngine(overrides?: Partial<StoryConfig>) {
	
	const config: StoryConfig = {
		start: overrides?.start ?? START,
		ending: overrides?.ending ?? base.ending,
		numberOfChapters: overrides?.numberOfChapters ?? base.numberOfChapters,
		randomPool: overrides?.randomPool ?? base.randomPool,
		sequences: overrides?.sequences ?? base.sequences,
	};
	
	const engine = new StoryEngine(config);
	engine.currentChapter = config.start;
	return engine;
}

it.each([
	{
		name: 'goes to ending when pool is empty',
		randomPool: [],
		expectExact: FIRST_ENDING,
	},
	{
		name: 'random chapter must come from pool',
		expectIn: base.randomPool,
		expectNotIn: [22, 6],
	},
	{
		name: 'random chapter must not be in consumedPoolEntries',
		consumedPoolEntries: new Set([4, 5]),
		expectIn: [7],
		expectNotIn: [4, 5],
	},
])('$name', ( {
				  randomPool,
				  consumedPoolEntries,
				  expectExact,
				  expectIn,
				  expectNotIn,
			  } ) => {
	
	const engine = createEngine({
		randomPool,
	});
	
	consumedPoolEntries?.forEach(c =>
		engine.consumedPoolEntries.add(c)
	);
	
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
});

it("queues sequence chapters after landing on a sequence start", () => {
	const engine = createEngine({
		randomPool: [7],
	});
	
	expect(engine.nextChapter()).toBe(7);
	expect(engine.nextChapter()).toBe(SEQUENCE_FROM_7.chapters[0]);
});

it("queues ordered sequence chapters in manifest order", () => {
	const engine = createEngine({
		randomPool: [24],
		sequences: new Map([
			[24, { chapters: [25, 26], mode: "ordered" }],
		]),
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
		numberOfChapters: 20,
		randomPool: [24],
		sequences: new Map([
			[24, { chapters: [25, 26], mode: "random" }],
		]),
	});
	
	expect(engine.nextChapter()).toBe(24);
	expect(engine.nextChapter()).toBe(25);
	expect(engine.nextChapter()).toBe(FIRST_ENDING);
});

it("draws from the random pool while fewer than numberOfChapters have been read", () => {
	const engine = createEngine({
		numberOfChapters: 2,
		randomPool: [4],
	});

	expect(engine.nextChapter()).toBe(4);
});

it("goes to the ending once numberOfChapters have been read", () => {
	const engine = createEngine({
		numberOfChapters: 1,
		randomPool: [4],
	});

	expect(engine.nextChapter()).toBe(FIRST_ENDING);
});

it("advances through the ending queue when the story is exhausted", () => {
	const engine = createEngine({
		numberOfChapters: 1,
		randomPool: [4],
	});

	expect(engine.nextChapter()).toBe(FIRST_ENDING);
	expect(engine.nextChapter()).toBe(LAST_ENDING);
});
