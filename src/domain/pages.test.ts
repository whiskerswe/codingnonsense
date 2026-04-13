import { getPage } from "./pages.ts";
import { parseMarkdown } from "./text/parseMarkdown.ts";
import type { Page } from "./models/page.ts";
import { resolveImage } from "./images/imageRegistry.ts";
import rawStart from "../data/pages/start.md?raw";
import rawAbout from "../data/pages/about.md?raw";

const start = parseMarkdown<Page>(rawStart);
const about = parseMarkdown<Page>(rawAbout);

describe("getPage", () => {
	it("returns the mapped start page", async () => {
		const page = await getPage("start");
		
		expect(page.id).toBe(start.attributes.id);
		expect(page.title).toBe(start.attributes.title);
		expect(page.button_text).toBe(start.attributes.button_text);
		expect(page.image).toBe(await resolveImage(start.attributes.image!));
		expect(page.body).toEqual(start.body);
	});
	
	it("returns the mapped about page", async () => {
		const page = await getPage("about");
		
		expect(page.id).toBe(about.attributes.id);
		expect(page.title).toBe(about.attributes.title);
		expect(page.button_text).toBe(about.attributes.button_text);
		expect(page.image).toBe(await resolveImage(about.attributes.image!));
		expect(page.body).toEqual(about.body);
	});
	
	it("falls back to start page for unknown ids", async () => {
		const page = await getPage("unknown-page");
		
		expect(page.id).toBe(start.attributes.id);
		expect(page.title).toBe(start.attributes.title);
	});
});
