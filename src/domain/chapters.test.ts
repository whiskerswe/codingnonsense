import { describe, expect, it } from "vitest";
import { chapterModules, getChapter, interpolateBody } from "./chapters";

describe("all chapters", () => {
	const paths = Object.keys(chapterModules);
	
	it("has at least one chapter", () => {
		expect(paths.length).toBeGreaterThan(0);
	});
	
	it("all chapters load correctly", async () => {
		for (const path of paths) {
			const fileName = path.split("/").pop()!;
			const id = fileName.replace(".md", "");
			
			const chapter = await getChapter(id);
			
			expect(chapter).not.toBeNull();
			expect(chapter!.id).toBe(id);
			expect(chapter!.title).toBeDefined();
			expect(chapter!.title.length).toBeGreaterThan(0);
			expect(Array.isArray(chapter!.characters)).toBe(true);
		}
	});
});


describe("chapters", () => {
	it("loads a chapter by id", async () => {
		const chapter = await getChapter("book1");
		
		expect(chapter).not.toBeNull();
		expect(chapter?.id).toBe("book1");
	});
});

describe("interpolateBody", () => {
	it("replaces numbered parameter placeholders", () => {
		const result = interpolateBody(
			"Perhaps {parameters[0]}, or {parameters[1]}, or even {parameters[2]}.",
			["a thing", "another thing", "the other thing"]
		);

		expect(result).toBe("Perhaps a thing, or another thing, or even the other thing.");
	});

	it("replaces missing parameters with an empty string", () => {
		const result = interpolateBody("Hello {parameters[0]}{parameters[1]}.", ["world"]);

		expect(result).toBe("Hello world.");
	});

	it("leaves incomplete placeholders unchanged", () => {
		const result = interpolateBody("Broken {parameters[0] placeholder", ["value"]);

		expect(result).toBe("Broken {parameters[0] placeholder");
	});
});

it("creates valid chapter object", async () => {
	const chapter = await getChapter("book1");
	
	expect(chapter).not.toBeNull();
	expect(chapter!.id).toBeDefined();
	expect(Array.isArray(chapter!.characters)).toBe(true);
});

it("applies fallback title", async () => {
	const chapter = await getChapter("book1");
	
	expect(chapter!.title).toBeDefined();
	expect(chapter!.title.length).toBeGreaterThan(0);
});

it("resolves image", async () => {
	const chapter = await getChapter("book1");
	
	expect(chapter!.image).toBeDefined();
	expect(typeof chapter!.image).toBe("string");
});

it("all chapters have valid images", async () => {
	for (const path of Object.keys(chapterModules)) {
		const fileName = path.split("/").pop()!;
		const id = fileName.replace(".md", "");
		
		const chapter = await getChapter(id);
		
		expect(typeof chapter!.image!).toBe("string");
		expect(chapter!.image!.length).toBeGreaterThan(0);
	}
});

it("returns null for missing chapter", async () => {
	const chapter = await getChapter("does-not-exist");
	
	expect(chapter).toBeNull();
});

