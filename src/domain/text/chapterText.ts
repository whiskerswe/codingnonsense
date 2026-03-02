import type { RawChapter } from "../models/rawChapter.ts";
import type { StyledText } from "../models/styledText.ts";
import { mergeDecorations } from "./mergeDecorations.ts";
import { toTextDecorations } from "./toTextDecorations.ts";

export const sentenceOrder = [
	"observe",
	"uncertainty",
	"misreflection",
	"response",
	"exit"
] as const;

export function mapTextWithStyling(raw: RawChapter): StyledText[] {
	const { text_decoration = {}, sentences } = raw;
	
	return sentenceOrder
		.filter((key) => sentences[key]?.trim() !== "")
		.map((key) => ({
			text: sentences[key],
			decoration: toTextDecorations(
				mergeDecorations(key, text_decoration)
			)
		}));
}
