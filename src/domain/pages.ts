import type { Page } from "./models/page.ts";
import { parseMarkdown } from "./text/parseMarkdown.ts";
import { resolveImage } from "./images/imageRegistry.ts";

import rawStart from "../data/pages/start.md?raw";
import rawAbout from "../data/pages/about.md?raw";
import rawNotFound from "../data/pages/not_found.md?raw";
import { PageAttributesSchema } from "./models/page_attributes.ts";

async function convertMarkdownPage( raw: string ): Promise<Page> {
	const { attributes, body } = parseMarkdown(raw);
	const validatedAttributes = PageAttributesSchema.parse(attributes);
	
	return {
		id: validatedAttributes.id,
		image: validatedAttributes.image ? await resolveImage(validatedAttributes.image) : undefined,
		title: validatedAttributes.title,
		button_text: validatedAttributes.button_text,
		body: body
	};
}

const rawPages: Record<string, string> = {
	start: rawStart,
	about: rawAbout,
	not_found: rawNotFound
};

export async function getPage( id: string ): Promise<Page> {
	const raw = rawPages[id] ?? rawStart;
	return await convertMarkdownPage(raw);
}
