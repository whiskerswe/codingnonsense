import { describe, expect, it } from "vitest";
import { storyManifest } from "./storyManifest.ts";


const usedChapterIds = Array.from(
	new Set([
		storyManifest.startChapterId,
		...storyManifest.endChapterIds,
		...storyManifest.randomChapterPool,
		...Object.keys(storyManifest.chapterSequences).map(Number),
		...Object.values(storyManifest.chapterSequences).flatMap(
			(sequence) => sequence.chapters
		),
	])
);


describe("storyManifest", () => {
	it("defines a valid story config shape", () => {
		expect(typeof storyManifest.startChapterId).toBe("number");
		expect(typeof storyManifest.maxNumberOfChapters).toBe("number");
		expect(Array.isArray(storyManifest.randomChapterPool)).toBe(true);
		expect(typeof storyManifest.chapterSequences).toBe("object");
	});

	it("defines numberOfChapters as a reachable story length before the ending", () => {
		expect(Number.isInteger(storyManifest.maxNumberOfChapters)).toBe(true);
		expect(storyManifest.maxNumberOfChapters).toBeGreaterThan(0);
		expect(storyManifest.randomChapterPool.length).toBeGreaterThanOrEqual(
			storyManifest.maxNumberOfChapters - 1
		);
	});

	it("builds usedChapterIds as a flat list of chapter numbers", () => {
		const expected = Array.from(new Set([
			storyManifest.startChapterId,
			...storyManifest.endChapterIds,
			...storyManifest.randomChapterPool,
			...Object.keys(storyManifest.chapterSequences).map(Number),
			...Object.values(storyManifest.chapterSequences).flatMap(
				(sequence) => sequence.chapters
			),
		]));
		expect(usedChapterIds).toEqual(expected);
		expect(usedChapterIds.every(chapterId => typeof chapterId === "number")).toBe(true);
	});
});
