import type { Page } from "./models/page.ts";
import { resolveImage } from "./images/imageRegistry";
import { parseMarkdown } from "./text/parseMarkdown.ts";

import rawStart from "../data/pages/start.md?raw";
import rawAbout from "../data/pages/about.md?raw";
import rawNotFound from "../data/pages/not_found.md?raw";

function convertMarkdownPage(raw: string): Page {
	const { attributes, body } = parseMarkdown<Page>(raw);
	
	return {
		id: attributes.id,
		image: resolveImage(attributes.image),
		title: attributes.title,
		button_text: attributes.button_text,
		body: body
	};
}

const rawPages: Record<string, string> = {
	start: rawStart,
	about: rawAbout,
	not_found: rawNotFound
};

export function getPage(id: string): Page {
	const raw = rawPages[id] ?? rawStart;
	return convertMarkdownPage(raw);
}