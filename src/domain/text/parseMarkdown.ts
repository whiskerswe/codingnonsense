import fm from "front-matter";

type ParseResult<T> = {
	attributes: T;
	body: string;
};

export function parseMarkdown<T>(raw: string) : ParseResult<T> {
	const { attributes, body } = fm<T>(raw);
	return {
		attributes,
		body: body.trim()
	};
}