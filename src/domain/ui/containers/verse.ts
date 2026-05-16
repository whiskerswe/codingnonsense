import type Token from "markdown-it/lib/token.mjs";

export function renderVerse(
	tokens: Token[],
	idx: number,
): string {
	if (tokens[idx].nesting === 1) {
		return `
			<div class="flex flex-col items-center">
				<div class="inline-block text-left">
		`;
	}
	return "</div> \n" +
		"</div>";
}
