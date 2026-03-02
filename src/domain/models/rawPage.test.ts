import { describe, expect, it } from "vitest";
import type { RawPage } from "./rawPage";

describe("RawPage model", () => {
	it("supports raw page typed input", () => {
		const rawPage: RawPage = {
			id: "start",
			title: "Start",
			sentences: { line1: "Welcome" },
			text_decoration: { line1: ["new_line"] },
		};

		expect(rawPage.title).toBe("Start");
		expect(rawPage.sentences.line1).toBe("Welcome");
	});
});
