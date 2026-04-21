import type { Chapter } from "./models/chapter.ts";
import { resolveImage } from "./images/imageRegistry.ts";
import { parseMarkdown } from "./text/parseMarkdown.ts";
import type { ChapterAttributes } from "./models/chapter_attributes.ts";
import type { Page } from "./models/page.ts";

const modules = import.meta.glob("/src/data/chapters/*.md", {
	query: "?raw",
	import: "default"
});

export async function getChapter(id: string): Promise<Chapter | null> {
	const path = `/src/data/chapters/${id}.md`;
	const loader = modules[path];
	if (!loader) return null;
	
	const result = await loader();
	
	if (!result) return null;
	
	const raw =
		typeof result === "string"
			? result
			: (result as any).default;
	
	if (typeof raw !== "string") {
		throw new Error("Markdown loader did not return a string");
	}
	
	const { attributes, body } = parseMarkdown<ChapterAttributes>(raw);
	
	return createChapter({
		page: await createChapterPageFromMarkdown(attributes, body),
		characters: attributes.characters ?? [],
	});
}

async function createChapterPageFromMarkdown( attributes: ChapterAttributes, body: string ): Promise<Page> {
	return {
		id: attributes.id,
		title: attributes.title ?? "*       *       *       *       *",
		body,
		image: await resolveImage(attributes.image),
		button_text: attributes.button_text
	};
}

export function createChapter(data: {
	page: Page;
	characters: string[];
}): Chapter {
	return {
		...data,
		
		get id() {
			return data.page.id;
		},
		get title() {
			return data.page.title;
		},
		get body() {
			return data.page.body;
		},
		get image() {
			return data.page.image!;
		}
	};
}
