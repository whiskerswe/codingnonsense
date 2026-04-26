import fm from "front-matter";

type ParseResult = {
	attributes: unknown;
	body: string;
};

export function parseMarkdown(raw: string): ParseResult {
	const { attributes, body } = fm(raw);
	return {
		attributes,
		body: body.trim(),
	};
}