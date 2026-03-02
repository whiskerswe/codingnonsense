import raw_start from '../data/start.json';
import raw_about from '../data/about.json';
import { mapPageTextWithStyling } from "./text/pageText.ts";
import type { RawPage } from "./models/rawPage.ts";
import type { Page } from "./models/page.ts";

const rawStart = raw_start as RawPage;
const rawAbout = raw_about as RawPage;

import { resolveImage } from "./images/imageRegistry";

function convertRawPage(raw: RawPage): Page {
	return {
		id: raw.id,
		image: resolveImage(raw.image),
		title: raw.title,
		button_text: raw.button_text,
		sentences: mapPageTextWithStyling(raw)
	};
}

const rawPages: Record<string, RawPage> = {
	start: rawStart,
	about: rawAbout
};

export function getPage(id: string): Page {
	const raw = rawPages[id] ?? rawStart;
	return convertRawPage(raw);
}





