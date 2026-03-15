import fm from "front-matter";

export function parseMarkdown<T>(raw: string) {
	const { attributes, body } = fm<T>(raw);
	
	return {
		attributes,
		body: body.trim()
	};
}