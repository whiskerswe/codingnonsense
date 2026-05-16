import type Token from "markdown-it/lib/token.mjs";

export function renderCollapsibleText(
	tokens: Token[],
	idx: number,
	classes: string,
): string {
	if (tokens[idx].nesting === 1) {
		const title = tokens[idx].info
			.trim()
			.slice("details".length)
			.trim();
		
		return `
			<details class="${classes}">
				<summary>${title}</summary>
		`;
	}
	
	return "</details>\n";
}