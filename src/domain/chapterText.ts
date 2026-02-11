import type { RawChapter } from "../types/rawChapter.ts";
import type { StyledText } from "../types/chapter.ts";

const sentenceOrder: (keyof RawChapter["sentences"])[] = [
	"observe",
	"uncertainty",
	"misreflection",
	"response",
	"exit"
];

export function mapTextWithStylingr(raw: RawChapter): StyledText[] {
	const { text_decoration = {}, sentences } = raw;
	
	return  sentenceOrder.map((key) => ({
			text: sentences[key],
			decoration: text_decoration[key]
		}))
	}
