import { describe, expect, it } from "vitest";
import type { RawChapter } from "./rawChapter";

describe("RawChapter model", () => {
	it("supports raw chapter typed input", () => {
		const rawChapter: RawChapter = {
			id: "1",
			characters: ["Alice"],
			sentences: { observe: "Line 1" },
			text_decoration: { observe: ["italics"] },
			button_text: "Next",
		};

		expect(rawChapter.sentences.observe).toBe("Line 1");
		expect(rawChapter.characters).toContain("Alice");
	});
});
