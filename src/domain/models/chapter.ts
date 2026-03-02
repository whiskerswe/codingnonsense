import type { StyledText } from "./styledText.ts";
import type { ImageKey } from "../images/imageRegistry.ts";

export type Chapter = {
	id: string;
	image?: ImageKey;
	characters: string[];
	title: string;
	sentences: StyledText[];
	button_text?: string;
};