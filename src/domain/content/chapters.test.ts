import { describe, expect, it } from "vitest";
import { chapterModules, getChapter } from "./chapters.ts";

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
			expect(
				chapter!.characters === undefined || Array.isArray(chapter!.characters)
			).toBe(true);
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

