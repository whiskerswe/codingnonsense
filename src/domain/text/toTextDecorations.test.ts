import { describe, expect, it } from "vitest";
import { toTextDecorations } from "./toTextDecorations.ts";

describe("toTextDecorations", () => {
	it("keeps only supported text decorations", () => {
		const result = toTextDecorations([
			"italics",
			"invalid",
			"new_line",
			"another-invalid",
		]);

		expect(result).toEqual(["italics", "new_line"]);
	});

	it("returns empty array when there are no valid values", () => {
		const result = toTextDecorations(["x", "y"]);
		expect(result).toEqual([]);
	});
});
