import { describe, expect, it } from "vitest";
import { getPage } from "./pages";
import { resolveImage } from "./images/imageRegistry";
import { parseMarkdown } from "./text/parseMarkdown.ts";

import rawStart from "../data/pages/start.md?raw";
import rawAbout from "../data/pages/about.md?raw";
import type { Page } from "./models/page.ts";

const start = parseMarkdown<Page>(rawStart);
const about = parseMarkdown<Page>(rawAbout);

describe("getPage", () => {
	it("returns the mapped start page", () => {
		const page = getPage("start");
		
		expect(page.id).toBe(start.attributes.id);
		expect(page.title).toBe(start.attributes.title);
		expect(page.button_text).toBe(start.attributes.button_text);
		expect(page.image).toBe(resolveImage(start.attributes.image));
		expect(page.body).toEqual(start.body);
	});
	
	it("returns the mapped about page", () => {
		const page = getPage("about");
		
		expect(page.id).toBe(about.attributes.id);
		expect(page.title).toBe(about.attributes.title);
		expect(page.button_text).toBe(about.attributes.button_text);
		expect(page.image).toBe(resolveImage(about.attributes.image));
		expect(page.body).toEqual(about.body);
	});
	
	it("falls back to start page for unknown ids", () => {
		const page = getPage("unknown-page");
		
		expect(page.id).toBe(start.attributes.id);
		expect(page.title).toBe(start.attributes.title);
	});
});