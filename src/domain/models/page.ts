import type { ImageKey } from "../images/imageRegistry.ts";

export type Page = {
	id: string;
	image: ImageKey;
	title: string;
	body: string;
	button_text?: string;
};