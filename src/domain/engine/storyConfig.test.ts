import { describe, expect, it } from "vitest";
import { storyConfig } from "./storyConfig.ts";


const usedChapterIds = Array.from(
	new Set([
		storyConfig.startChapterId,
		...storyConfig.endChapterIds,
		...storyConfig.randomChapterPool,
		...Object.keys(storyConfig.chapterSequences).map(Number),
		...Object.values(storyConfig.chapterSequences).flatMap(
			(sequence) => sequence.chapters
		),
	])
);


describe("storyConfig", () => {
	it("defines a valid story config shape", () => {
		expect(typeof storyConfig.startChapterId).toBe("number");
		expect(typeof storyConfig.maxNumberOfChapters).toBe("number");
		expect(Array.isArray(storyConfig.randomChapterPool)).toBe(true);
		expect(typeof storyConfig.chapterSequences).toBe("object");
	});

	it("defines numberOfChapters as a reachable story length before the ending", () => {
		expect(Number.isInteger(storyConfig.maxNumberOfChapters)).toBe(true);
		expect(storyConfig.maxNumberOfChapters).toBeGreaterThan(0);
		expect(storyConfig.randomChapterPool.length).toBeGreaterThanOrEqual(
			storyConfig.maxNumberOfChapters - 1
		);
	});

	it("builds usedChapterIds as a flat list of chapter numbers", () => {
		const expected = Array.from(new Set([
			storyConfig.startChapterId,
			...storyConfig.endChapterIds,
			...storyConfig.randomChapterPool,
			...Object.keys(storyConfig.chapterSequences).map(Number),
			...Object.values(storyConfig.chapterSequences).flatMap(
				(sequence) => sequence.chapters
			),
		]));
		expect(usedChapterIds).toEqual(expected);
		expect(usedChapterIds.every(chapterId => typeof chapterId === "number")).toBe(true);
	});
});
