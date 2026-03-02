import raw from '../data/chapters.json';
import type { Chapter } from './models/chapter.ts';
import type { RawChapter } from './models/rawChapter.ts';
import { mapTextWithStyling } from "./text/chapterText.ts";
import { resolveImage } from "./images/imageRegistry.ts";


const rawChapters = raw as RawChapter[];


function convertRawChapter(raw: RawChapter): Chapter {
	console.log("raw.image:", raw.image);
	return {
		id: raw.id,
		characters: raw.characters,
		title: raw.title ?? "*       *       *       *       *",
		sentences: mapTextWithStyling(raw),
		image: resolveImage(raw.image),
		button_text: raw.button_text
	};
}

export const chapters: Chapter[] = rawChapters.map(convertRawChapter);
