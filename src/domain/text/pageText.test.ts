import { describe, expect, it } from "vitest";
import type { RawPage } from "../models/rawPage.ts";
import { mapPageTextWithStyling } from "./pageText.ts";

describe("mapPageTextWithStyling", () => {
	it("maps sentences in numeric key order", () => {
		const raw: RawPage = {
			id: "start",
			title: "Start",
			sentences: {
				line10: "C",
				line2: "B",
				line1: "A",
			},
		};

		const result = mapPageTextWithStyling(raw);
		expect(result.map((s) => s.text)).toEqual(["A", "B", "C"]);
	});

	it("applies global and local decorations", () => {
		const raw: RawPage = {
			id: "start",
			title: "Start",
			sentences: {
				line1: "A",
				line2: "B",
			},
			text_decoration: {
				all: ["italics"],
				line2: ["new_line"],
			},
		};

		const result = mapPageTextWithStyling(raw);
		expect(result).toEqual([
			{ text: "A", decoration: ["italics"] },
			{ text: "B", decoration: ["italics", "new_line"] },
		]);
	});
});
