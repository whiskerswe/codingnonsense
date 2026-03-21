import { describe, expect, it } from "vitest";
import { imageRegistry, resolveImage } from "./imageRegistry";

describe("imageRegistry", () => {
	it("builds a non-empty registry of image keys to src strings", () => {
		const keys = Object.keys(imageRegistry);
		expect(keys.length).toBeGreaterThan(0);
		expect(typeof imageRegistry[keys[0]]).toBe("string");
	});

	it("resolves a known key", () => {
		expect(resolveImage("book3")).toBe(imageRegistry.book3);
	});

	it("normalizes extension when resolving a key", () => {
		expect(resolveImage("book3.jpg")).toBe(resolveImage("book3"));
	});

	it("returns default image for missing key", () => {
		const defaultImage = resolveImage("");
		expect(resolveImage("does-not-exist")).toBe(defaultImage);
	});
});
