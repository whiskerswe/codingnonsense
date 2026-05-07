import { describe, expect, it } from "vitest";
import { imageRegistry, resolveImage } from "./imageRegistry";

describe("imageRegistry", () => {
	it("builds a non-empty registry of image loaders", () => {
		const keys = Object.keys(imageRegistry);
		
		expect(keys.length).toBeGreaterThan(0);
		expect(typeof imageRegistry[keys[0]]).toBe("string");
	});
	
	it("resolves a known key for chapters", async () => {
		const expected = "/src/assets/images/chapters/book1.webp";
		const actual = resolveImage("book1");
		
		expect(actual).toBe(expected);
	});
	
	
	it("resolves a known key for pages", async () => {
		const expected = "/src/assets/images/pages/alice_circle.webp";
		const actual = resolveImage("alice_circle");
		
		expect(actual).toBe(expected);
	});
	
	it("returns default image for missing key", async () => {
		const defaultImage = "/src/assets/images/chapters/book3.webp";
		const result = resolveImage("does-not-exist");
		
		expect(result).toBe(defaultImage);
	});
});