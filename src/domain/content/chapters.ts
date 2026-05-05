import type { Chapter } from "../models/chapter.ts";
import { resolveImage } from "../images/imageRegistry.ts";
import { parseMarkdown } from "./parseMarkdown.ts";
import { type ChapterAttributes, ChapterAttributesSchema } from "../models/chapter_attributes.ts";
import { resolveTextWithParams } from "../storyTextRules/textResolver.ts";

export const CHAPTERS_DIRECTORY = "/src/assets/data/chapters";

export const chapterModules = import.meta.glob("/src/assets/data/chapters/*.md", {
	query: "?raw",
	import: "default"
});

export function getChapterModulePath(id: string): string {
	return `${CHAPTERS_DIRECTORY}/${id}.md`;
}

export async function getChapter(id: string): Promise<Chapter | null> {
	const raw = await getRawChapter(id);
	if (!raw) {
		return null;
	}

	const parsed = parseMarkdown(raw);
	const attributes = validateAttributes(parsed.attributes);
	const body = resolveTextWithParams(parsed.body, attributes.parameters);
	const image = attributes.image
		? await resolveImage(attributes.image)
		: undefined;
	
	return buildChapter({
		...attributes,
		body,
		image
	});
}

async function getRawChapter(id: string): Promise<string | null> {
	const loader = chapterModules[getChapterModulePath(id)];
	if (!loader) {
		return null;
	}
	const result = await loader();
	if (typeof result !== "string") {
		throw new Error(`Chapter ${id} did not return a string`);
	}
	
	return result;
}
function buildChapter( data: {
	id: string;
	title: string;
	body: string;
	image?: string;
	image_width: number;
	image_height: number;
	button_text?: string;
	characters?: string[];
	themes?: string[];
} ): Chapter {
	return {
		...data,
		characters: data.characters ?? [],
		themes: data.themes ?? []
	};
}

type ValidatedChapterAttributes = ChapterAttributes & {
	title: string;
};

function validateAttributes(attributes: unknown): ValidatedChapterAttributes {
	const validated = ChapterAttributesSchema.parse(attributes);
	
	return {
		...validated,
		title: validated.title ?? "*       *       *       *       *"
	};
}

