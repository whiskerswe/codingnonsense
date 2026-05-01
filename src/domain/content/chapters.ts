import type { Chapter } from "../models/chapter.ts";
import { resolveImage } from "../images/imageRegistry.ts";
import { parseMarkdown } from "./parseMarkdown.ts";
import { type ChapterAttributes, ChapterAttributesSchema } from "../models/chapter_attributes.ts";
import { resolveChapterText } from "../storyTextRules/textResolver.ts";

export const CHAPTERS_DIRECTORY = "/src/assets/data/chapters";

export const chapterModules = import.meta.glob("/src/assets/data/chapters/*.md", {
	query: "?raw",
	import: "default"
});

export function getChapterModulePath(id: string): string {
	return `${CHAPTERS_DIRECTORY}/${id}.md`;
}

export async function getChapter(id: string): Promise<Chapter | null> {
	const path = getChapterModulePath(id);
	const loader = chapterModules[path];
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
	
	const { attributes, body } = parseChapterFromMarkdown(raw);
	
	return await createChapter(attributes, body);
}

function parseChapterFromMarkdown(raw: string) {
	const { attributes, body } = parseMarkdown(raw);
	const validatedAttributes = ChapterAttributesSchema.parse(attributes);
	const interpolatedBody = resolveChapterText(body, validatedAttributes.parameters);
	return { attributes: validatedAttributes, body: interpolatedBody };
}

async function createChapter(
	attributes: ChapterAttributes,
	body: string
): Promise<Chapter> {
	return {
		id: attributes.id,
		title: attributes.title ?? "*       *       *       *       *",
		body,
		image: await resolveImage(attributes.image),
		image_width: attributes.image_width,
		image_height: attributes.image_height,
		button_text: attributes.button_text,
		characters: attributes.characters ?? [],
	};
}
