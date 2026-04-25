import type { Page } from "./page.ts";

export type Chapter = Page & {
	characters?: string[];
	parameters?: string[];
	themes?: string[];
};