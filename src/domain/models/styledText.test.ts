import { describe, expect, it } from "vitest";
import type { StyledText } from "./styledText";

describe("StyledText model", () => {
	it("supports text with decoration values", () => {
		const styled: StyledText = {
			text: "Hello",
			decoration: ["italics", "new_line"],
		};

		expect(styled.text).toBe("Hello");
		expect(styled.decoration).toEqual(["italics", "new_line"]);
	});
});
