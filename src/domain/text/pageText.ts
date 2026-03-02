import type { RawPage } from "../models/rawPage.ts";
import type { StyledText } from "../models/styledText.ts";
import { mergeDecorations } from "./mergeDecorations.ts";
import { toTextDecorations } from "./toTextDecorations.ts";


export function mapPageTextWithStyling(raw: RawPage): StyledText[] {
	const { text_decoration = {}, sentences } = raw;
	
	const orderedKeys = Object.keys(sentences).sort((a, b) => {
		const numA = Number(a.replace(/\D/g, ""));
		const numB = Number(b.replace(/\D/g, ""));
		return numA - numB;
	});
	
	return orderedKeys.map((key) => ({
		text: sentences[key],
		decoration: toTextDecorations(
			mergeDecorations(key, text_decoration)
		)
	}));
}