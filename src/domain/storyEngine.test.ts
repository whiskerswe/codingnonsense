import { it, expect } from "vitest";
import { type StoryConfig, StoryEngine } from "./storyEngine.js";


const base = defaultConfig();
const START = base.start
const ENDING = base.ending;
const FORCE_FROM_7 = base.sequences.get(7)!;

function defaultConfig(): StoryConfig {
	return {
		start: 3,
		ending: 22,
		numberOfChapters: 10,
		randomPool: [4, 5, 7],
		sequences: new Map([
			[7, 6],
			[22, 23],
		]),
	};
}

function createEngine(overrides?: Partial<StoryConfig>) {
	
	const config: StoryConfig = {
		start: overrides?.start ?? START,
		ending: overrides?.ending ?? ENDING,
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
		name: 'forces next chapter when sequence exists',
		current: 7,
		expectExact: FORCE_FROM_7,
	},
	{
		name: 'goes to ending when pool is empty',
		randomPool: [],
		expectExact: ENDING,
	},
	{
		name: 'random chapter must come from pool',
		expectIn: base.randomPool,
		expectNotIn: [22, 6],
	},
	{
		name: 'random chapter must not be in consumedPoolEntries',
		consumedPoolEntries: new Set([4, 5]),
		expectIn: [7, 8],
		expectNotIn: [4, 5],
	},
	{
		name: 'forced overrides random pool',
		current: 7,
		expectExact: FORCE_FROM_7,
	}
])('$name', ( {
				  current,
				  randomPool,
				  consumedPoolEntries,
				  expectExact,
				  expectIn,
				  expectNotIn,
			  } ) => {
	
	const engine = createEngine({
		randomPool,
	});
	
	engine.currentChapter = current ?? START;
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

	expect(engine.nextChapter()).toBe(ENDING);
});
