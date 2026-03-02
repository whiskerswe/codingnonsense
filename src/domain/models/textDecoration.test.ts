import { describe, expect, expectTypeOf, it } from "vitest";
import { TEXT_DECORATIONS, type TextDecoration } from "./textDecoration";

describe("TextDecoration model", () => {
	it("exposes supported text decorations", () => {
		expect(TEXT_DECORATIONS).toEqual(["italics", "new_line"]);
		expect(new Set(TEXT_DECORATIONS).size).toBe(TEXT_DECORATIONS.length);
	});

	it("keeps TextDecoration aligned with TEXT_DECORATIONS", () => {
		const decoration: TextDecoration = "italics";
		expect(TEXT_DECORATIONS).toContain(decoration);
		expectTypeOf<TextDecoration>().toEqualTypeOf<"italics" | "new_line">();
	});
});
