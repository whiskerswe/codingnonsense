import { describe, expect, it } from "vitest";
import raw from "../data/chapters.json";
import { chapters } from "./chapters";
import type { RawChapter } from "./models/rawChapter";
import { resolveImage } from "./images/imageRegistry";
import { mapTextWithStyling } from "./text/chapterText";

const FALLBACK_TITLE = "*       *       *       *       *";
const rawChapters = raw as RawChapter[];

describe("chapters", () => {
	it("maps all raw chapters", () => {
		expect(chapters).toHaveLength(rawChapters.length);
		expect(chapters.map((c) => c.id)).toEqual(rawChapters.map((r) => r.id));
	});

	it("maps chapter fields from raw input", () => {
		rawChapters.forEach((rawChapter, index) => {
			const chapter = chapters[index];
			expect(chapter.id).toBe(rawChapter.id);
			expect(chapter.characters).toEqual(rawChapter.characters);
			expect(chapter.title).toBe(rawChapter.title ?? FALLBACK_TITLE);
			expect(chapter.button_text).toBe(rawChapter.button_text);
			expect(chapter.image).toBe(resolveImage(rawChapter.image));
			expect(chapter.sentences).toEqual(mapTextWithStyling(rawChapter));
		});
	});
});
