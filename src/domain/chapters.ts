import type { Chapter } from "./models/chapter.ts";
import { resolveImage } from "./images/imageRegistry.ts";
import { parseMarkdown } from "./text/parseMarkdown.ts";

const modules = import.meta.glob("/src/data/chapters/*.md", {
	eager: true,
	query: "?raw",
	import: 'default'
});

const sortedModules = Object.entries(modules).sort(([a], [b]) =>
	a.localeCompare(b)
);

export const chapters: Chapter[] = sortedModules.map(([, raw]) => {
	const { attributes, body } = parseMarkdown<Chapter>(raw as string);
	
	return {
		id: attributes.id,
		title: attributes.title ?? "*       *       *       *       *",
		body,
		image: resolveImage(attributes.image),
		characters: attributes.characters ?? [],
		button_text: attributes.button_text
	};
});