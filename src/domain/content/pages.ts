import type { Page } from "../models/page.ts";
import { parseMarkdown } from "./parseMarkdown.ts";
import { resolveImage } from "../images/imageRegistry.ts";

import rawStart from "../../assets/data/pages/start.md?raw";
import rawAbout from "../../assets/data/pages/about.md?raw";
import rawNotFound from "../../assets/data/pages/not_found.md?raw";
import { PageAttributesSchema } from "../models/page_attributes.ts";
import { resolveTextWithParams } from "./text/textResolver.ts";


export async function getPage( id: string ): Promise<Page> {
	const raw = getRawPage(id);
	const parsed = parseMarkdown(raw);
	const attributes = validateAttributes(parsed.attributes);
	const body = resolveTextWithParams(parsed.body, attributes.parameters);
	const image = attributes.image
		? resolveImage(attributes.image)
		: undefined;
	console.log(attributes);
	return buildPage({
		...attributes,
		body,
		image
	});
}

function buildPage( data: {
	id: string;
	title: string;
	body: string;
	image?: string;
	image_width: number;
	image_height: number;
	button_text?: string;
} ): Page {
	return data;
}

function validateAttributes( attributes: unknown ) {
	return PageAttributesSchema.parse(attributes);
}

const rawPages: Record<string, string> = {
	start: rawStart,
	about: rawAbout,
	not_found: rawNotFound
};

function getRawPage( id: string ): string {
	return rawPages[id] ?? rawStart;
}
