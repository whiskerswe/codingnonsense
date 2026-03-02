import { TEXT_DECORATIONS } from "../models/textDecoration";
import type { TextDecoration } from "../models/textDecoration";

export function toTextDecorations(
	values: string[]
): TextDecoration[] {
	return values.filter(
		(v): v is TextDecoration =>
			TEXT_DECORATIONS.includes(v as TextDecoration)
	);
}