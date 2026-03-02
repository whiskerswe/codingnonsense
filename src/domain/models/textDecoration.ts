export const TEXT_DECORATIONS = [
	"italics",
	"new_line"
] as const;

export type TextDecoration =
	typeof TEXT_DECORATIONS[number];