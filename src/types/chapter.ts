import type { TextDecoration } from "../styles/textDecoration.ts";

export type StyledText = {
	text: string;
	decoration?: TextDecoration[];
};

export type Chapter = {
	id: string;
	image?: string;
	characters: string[];
	sentences: StyledText[];
};