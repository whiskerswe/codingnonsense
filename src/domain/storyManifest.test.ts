import { describe, expect, it } from "vitest";
import { storyManifest, usedChapterIds } from "./storyManifest";

describe("storyManifest", () => {
	it("defines a valid story config shape", () => {
		expect(typeof storyManifest.start).toBe("number");
		expect(typeof storyManifest.ending).toBe("number");
		expect(Array.isArray(storyManifest.randomPool)).toBe(true);
		expect(storyManifest.sequences).toBeInstanceOf(Map);
	});

	it("builds usedChapterIds as a flat list of chapter numbers", () => {
		const expected = Array.from(new Set([
			storyManifest.start,
			storyManifest.ending,
			...storyManifest.randomPool,
			...storyManifest.sequences.keys(),
			...storyManifest.sequences.values(),
		]));

		expect(usedChapterIds).toEqual(expected);
		expect(usedChapterIds.every((id) => typeof id === "number")).toBe(true);
	});
});
