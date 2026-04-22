import { describe, expect, it } from "vitest";
import { storyManifest, usedChapterIds } from "./storyManifest";

describe("storyManifest", () => {
	it("defines a valid story config shape", () => {
		expect(typeof storyManifest.start).toBe("number");
		expect(Array.isArray(storyManifest.ending)).toBe(true);
		expect(typeof storyManifest.numberOfChapters).toBe("number");
		expect(Array.isArray(storyManifest.randomPool)).toBe(true);
		expect(storyManifest.sequences).toBeInstanceOf(Map);
	});

	it("defines numberOfChapters as a reachable story length before the ending", () => {
		expect(Number.isInteger(storyManifest.numberOfChapters)).toBe(true);
		expect(storyManifest.numberOfChapters).toBeGreaterThan(0);
		expect(storyManifest.randomPool.length).toBeGreaterThanOrEqual(
			storyManifest.numberOfChapters - 1
		);
	});

	it("builds usedChapterIds as a flat list of chapter numbers", () => {
		const expected = Array.from(new Set([
			storyManifest.start,
			...storyManifest.ending,
			...storyManifest.randomPool,
			...storyManifest.sequences.keys(),
			...Array.from(storyManifest.sequences.values()).flatMap(sequence => sequence.chapters),
		]));
		expect(usedChapterIds).toEqual(expected);
		expect(usedChapterIds.every(chapterId => typeof chapterId === "number")).toBe(true);
	});
});
