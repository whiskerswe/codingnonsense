
import type { TextDecoration } from "../styles/textDecoration.ts";
import type { sentenceOrder } from "../domain/chapterText.ts";


export type SentenceKey = typeof sentenceOrder[number];

export type RawChapter = {
	id: string;
	image?: string;
	characters: string[];
	sentences: Record<SentenceKey, string>;
	text_decoration?: Partial<Record<SentenceKey, TextDecoration[]>>;
};
