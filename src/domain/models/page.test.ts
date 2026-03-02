import { describe, expect, it } from "vitest";
import type { Page } from "./page";
import type { StyledText } from "./styledText";

describe("Page model", () => {
	it("supports typed page content", () => {
		const sentence: StyledText = { text: "Welcome", decoration: [] };
		const page: Page = {
			id: "page-1",
			title: "Start",
			sentences: [sentence],
			button_text: "Next",
		};

		expect(page.title).toBe("Start");
		expect(page.sentences[0].text).toBe("Welcome");
	});
});
