import { describe, expect, it } from "vitest";
import { chapters } from "./chapters";
import { resolveImage } from "./images/imageRegistry";

describe("chapters", () => {
	
	it("loads chapters", () => {
		expect(chapters.length).toBeGreaterThan(0);
	});
	
	it("creates valid chapter objects", () => {
		chapters.forEach((chapter) => {
			expect(chapter.id).toBeDefined();
			expect(Array.isArray(chapter.characters)).toBe(true);
		});
	});
	
	it("applies fallback title", () => {
		chapters.forEach((chapter) => {
			expect(chapter.title).toBeDefined();
			expect(chapter.title.length).toBeGreaterThan(0);
		});
	});
	
	it("resolves images correctly", () => {
		chapters.forEach((chapter) => {
			if (chapter.image) {
				expect(resolveImage(chapter.image)).toBeDefined();
			}
		});
	});
	
});