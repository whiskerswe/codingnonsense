import type { StyledText } from "./styledText.ts";
import type { ImageKey } from "../images/imageRegistry.ts";

export type Page = {
	id: string;
	image?: ImageKey;
	title: string;
	sentences: StyledText[];
	button_text?: string;
};