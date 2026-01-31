import raw from './chapters.json';
import type { Chapter } from '../types/chapter';
import { isImageKey } from '../assets/images';

const rawChapters = raw as Chapter[];

export const chapters: Chapter[] = rawChapters.map(ch => ({
	id: ch.id,
	characters: ch.characters,
	sentences: ch.sentences,
	image: ch.image && isImageKey(ch.image)
		? ch.image
		: undefined
}));