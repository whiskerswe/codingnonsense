import { describe, expect, it } from "vitest";
import type { Chapter } from "./chapter";
import type { StyledText } from "./styledText";

describe("Chapter model", () => {
	it("supports typed chapter content", () => {
		const sentence: StyledText = { text: "Hello", decoration: ["italics"] };
		const chapter: Chapter = {
			id: "chapter-1",
			characters: ["Alice"],
			title: "Start",
			sentences: [sentence],
			button_text: "Continue",
		};

		expect(chapter.characters).toEqual(["Alice"]);
		expect(chapter.sentences[0].text).toBe("Hello");
	});
});
