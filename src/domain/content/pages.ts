import type { Page } from "../models/page.ts";
import { parseMarkdown } from "./parseMarkdown.ts";
import { resolveImage } from "../images/imageRegistry.ts";

import rawStart from "../../assets/data/pages/start.md?raw";
import rawAbout from "../../assets/data/pages/about.md?raw";
import rawNotFound from "../../assets/data/pages/not_found.md?raw";
import { PageAttributesSchema } from "../models/page_attributes.ts";
import { resolveChapterText } from "../storyTextRules/textResolver.ts";

async function createChapterFromMarkdown( raw: string ): Promise<Page> {
	const { attributes, body } = parseMarkdown(raw);
	const validatedAttributes = PageAttributesSchema.parse(attributes);
	const interpolatedBody = resolveChapterText(body, validatedAttributes.parameters);
	
	return {
		id: validatedAttributes.id,
		image: validatedAttributes.image ? await resolveImage(validatedAttributes.image) : undefined,
		image_width: validatedAttributes.image_width,
		image_height: validatedAttributes.image_height,
		title: validatedAttributes.title,
		button_text: validatedAttributes.button_text,
		body: interpolatedBody
	};
}

const rawPages: Record<string, string> = {
	start: rawStart,
	about: rawAbout,
	not_found: rawNotFound
};

export async function getPage( id: string ): Promise<Page> {
	const raw = rawPages[id] ?? rawStart;
	return await createChapterFromMarkdown(raw);
}
