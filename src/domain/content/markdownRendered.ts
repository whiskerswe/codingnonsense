import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import type Token from "markdown-it/lib/token.mjs";
import { containerStyling, type ContainerName } from "./containerStyling";

const md = new MarkdownIt({
	html: false,
	breaks: true,
	linkify: true,
});

(Object.entries(containerStyling) as [ContainerName, string][]).forEach(
	([name, classes]) => {
		md.use(container, name, {
			render(tokens: Token[], idx: number) {
				if (tokens[idx].nesting === 1) {
					return `<div class="${classes}">\n`;
				}
				return "</div>\n";
			},
		});
	}
);


export function renderMarkdown(raw: string): string {
	return md.render(raw);
}