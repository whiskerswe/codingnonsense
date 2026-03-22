import { describe, expect, it } from "vitest";
import { imageRegistry, resolveImage } from "./imageRegistry";

describe("imageRegistry", () => {
	it("builds a non-empty registry of image loaders", () => {
		const keys = Object.keys(imageRegistry);
		
		expect(keys.length).toBeGreaterThan(0);
		expect(typeof imageRegistry[keys[0]]).toBe("function");
	});
	
	it("resolves a known key", async () => {
		const expected = await imageRegistry["book1"]();
		const actual = await resolveImage("book1");
		
		expect(actual).toBe(expected);
	});
	
	it("normalizes extension when resolving a key", async () => {
		const a = await resolveImage("book1.jpg");
		const b = await resolveImage("book1");
		
		expect(a).toBe(b);
	});
	
	it("returns default image for missing key", async () => {
		const defaultImage = "/src/assets/images/chapters/book3.jpg";
		const result = await resolveImage("does-not-exist");
		
		expect(result).toBe(defaultImage);
	});
});