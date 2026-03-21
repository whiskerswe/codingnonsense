import type { Chapter } from "./models/chapter.ts";
import { resolveImage } from "./images/imageRegistry.ts";
import { parseMarkdown } from "./text/parseMarkdown.ts";
import type { ChapterAttributes } from "./models/chapter_attributes.ts";
import type { Page } from "./models/page.ts";

const modules = import.meta.glob("/src/data/chapters/*.md", {
	eager: true,
	query: "?raw",
	import: 'default'
});

function createChapterPageFromMarkdown(attributes: ChapterAttributes, body: string): Page {
	return {
		id: attributes.id,
		title: attributes.title ?? "*       *       *       *       *",
		body,
		image: resolveImage(attributes.image),
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
			return data.page.image;
		}
	};
}

const sortedModules = Object.entries(modules).sort(([a], [b]) =>
	a.localeCompare(b)
);

export const chapters: Chapter[] = sortedModules.map(([, raw]) => {
	const { attributes, body } = parseMarkdown<ChapterAttributes>(raw as string);
	
	return createChapter({
		page: createChapterPageFromMarkdown(attributes, body),
		characters: attributes.characters ?? [],
	});
});