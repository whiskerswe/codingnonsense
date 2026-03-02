import { describe, expect, it } from "vitest";
import rawStart from "../data/start.json";
import rawAbout from "../data/about.json";
import type { RawPage } from "./models/rawPage";
import { getPage } from "./pages";
import { mapPageTextWithStyling } from "./text/pageText";
import { resolveImage } from "./images/imageRegistry";

const start = rawStart as RawPage;
const about = rawAbout as RawPage;

describe("getPage", () => {
	it("returns the mapped start page", () => {
		const page = getPage("start");
		expect(page.id).toBe(start.id);
		expect(page.title).toBe(start.title);
		expect(page.button_text).toBe(start.button_text);
		expect(page.image).toBe(resolveImage(start.image));
		expect(page.sentences).toEqual(mapPageTextWithStyling(start));
	});

	it("returns the mapped about page", () => {
		const page = getPage("about");
		expect(page.id).toBe(about.id);
		expect(page.title).toBe(about.title);
		expect(page.button_text).toBe(about.button_text);
		expect(page.image).toBe(resolveImage(about.image));
		expect(page.sentences).toEqual(mapPageTextWithStyling(about));
	});

	it("falls back to start page for unknown ids", () => {
		const page = getPage("unknown-page");
		expect(page.id).toBe(start.id);
		expect(page.title).toBe(start.title);
	});
});
