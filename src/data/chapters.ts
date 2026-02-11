import raw from './chapters.json';
import type { Chapter } from '../types/chapter';
import type { RawChapter } from '../types/rawChapter';
import image3 from '../assets/tenniel/book3.jpg';
import type { images } from "../env/tennielAssets.ts";
import { tennielImages } from "../images/tenniel.ts";
import { mapTextWithStylingr } from "../domain/chapterText.ts";

const defaultImage = image3;
const rawChapters = raw as RawChapter[];

export const chapters: Chapter[] = rawChapters.map((ch) => ({
	id: ch.id,
	characters: ch.characters,
	sentences: mapTextWithStylingr(ch),
	image:
		ch.image !== undefined && isImageKey(ch.image)
			? ch.image
			: defaultImage,
}));

export type ImageKey = keyof typeof images;

export function isImageKey(value: unknown) : value is ImageKey {
	return typeof value === "string";
}

export function resolveChapterImage(chapter: Chapter): string {
	console.log("chapter", chapter.id, "image", chapter.image);
	// @ts-ignore
	console.log(tennielImages[chapter.image]);
	return chapter.image
		? tennielImages[chapter.image] ?? defaultImage
		: defaultImage;
}
