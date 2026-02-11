
import type { TextDecoration } from "../styles/textDecoration.ts";

export type SentenceKey =
	| "observe"
	| "uncertainty"
	| "misreflection"
	| "response"
	| "exit";

export type RawChapter = {
	id: string;
	image?: string;
	characters: string[];
	sentences: Record<SentenceKey, string>;
	text_decoration?: Partial<Record<SentenceKey, TextDecoration[]>>;
};
