import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import type Token from "markdown-it/lib/token.mjs";
import { containerStyling, type ContainerName } from "./containerStyling.ts";

const md = new MarkdownIt({
	html: false,
	breaks: true,
	linkify: true,
});

const defaultRender =
	md.renderer.rules.link_open ||
	((tokens, idx, options, _env, self) =>
		self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
	const token = tokens[idx];
	const href = token.attrGet("href");
	
	if (href?.startsWith("http")) {
		token.attrSet("target", "_blank");
		token.attrSet("rel", "noopener noreferrer");
	}
	
	return defaultRender(tokens, idx, options, env, self);
};

(Object.entries(containerStyling) as [ContainerName, string][])
	.forEach(( [name, classes] ) => {
		md.use(container, name, {
			render( tokens: Token[], idx: number ) {
				if (tokens[idx].nesting === 1) {
					if (name === "details") {
						const title = tokens[idx].info
							.trim()
							.slice("details".length)
							.trim();
						return `
              <details class="${classes}">
                <summary>${title}</summary>
            `;
					}
					return `<div class="${classes}">\n`;
				}
				if (name === "details") {
					return "</details>\n";
				}
				return "</div>\n";
			},
		});
	});

export function renderMarkdown( raw: string ): string {
	return md.render(raw);
}