import { describe, expect, it } from "vitest";
import { getChapter } from "./chapters";

const modules = import.meta.glob("/src/data/chapters/*.md");

describe("all chapters", () => {
	const paths = Object.keys(modules);
	
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
	
	expect(chapter!.page.image).toBeDefined();
	expect(typeof chapter!.page.image).toBe("string");
});

it("all chapters have valid images", async () => {
	for (const path of Object.keys(modules)) {
		const fileName = path.split("/").pop()!;
		const id = fileName.replace(".md", "");
		
		const chapter = await getChapter(id);
		
		expect(typeof chapter!.page.image!).toBe("string");
		expect(chapter!.page.image!.length).toBeGreaterThan(0);
	}
});

it("returns null for missing chapter", async () => {
	const chapter = await getChapter("does-not-exist");
	
	expect(chapter).toBeNull();
});

