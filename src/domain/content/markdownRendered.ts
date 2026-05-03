import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import type Token from "markdown-it/lib/token.mjs";

const md = new MarkdownIt({
	html: false,
	breaks: true,
	linkify: true,
});

md.use(container, "verse", {
	render(tokens: Token[], idx: number) {
		if (tokens[idx].nesting === 1) {
			return '<div class="verse pl-6 leading-relaxed">\n';
		}
		return "</div>\n";
	},
});


export function renderMarkdown(raw: string): string {
	return md.render(raw);
}