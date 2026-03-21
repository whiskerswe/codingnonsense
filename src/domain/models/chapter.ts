import type { Page } from "./page.ts";

export type Chapter = {
	page: Page;
	characters: string[];
	
	get id(): string;
	get title(): string;
	get body(): string;
	get image(): string;
};