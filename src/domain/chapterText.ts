import type { RawChapter } from "../types/rawChapter.ts";
import type { StyledText } from "../types/chapter.ts";

export const sentenceOrder = [
	"observe",
	"uncertainty",
	"misreflection",
	"response",
	"exit"
] as const;

export function mapTextWithStyling( raw: RawChapter ): StyledText[] {
	const {text_decoration = {}, sentences} = raw;
	
	return sentenceOrder
		.filter(( key ) => sentences[key].trim() !== "")
		.map(( key ) => ({
			text: sentences[key],
			decoration: text_decoration[key]
		}))
}
