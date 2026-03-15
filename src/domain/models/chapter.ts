import type { ImageKey } from "../images/imageRegistry.ts";

export type Chapter = {
	id: string;
	image?: ImageKey;
	characters: string[];
	title: string;
	body: string;
	button_text?: string;
};