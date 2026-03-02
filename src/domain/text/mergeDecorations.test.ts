import { describe, expect, it } from "vitest";
import { mergeDecorations } from "./mergeDecorations.ts";

describe("mergeDecorations", () => {
	it("combines global and local decorations in order", () => {
		const result = mergeDecorations("line1", {
			all: ["italics"],
			line1: ["new_line"],
		});

		expect(result).toEqual(["italics", "new_line"]);
	});

	it("returns only global decorations when local is missing", () => {
		const result = mergeDecorations("line2", {
			all: ["italics"],
		});

		expect(result).toEqual(["italics"]);
	});

	it("returns empty array when no decorations exist", () => {
		const result = mergeDecorations("line1", {});
		expect(result).toEqual([]);
	});
});
