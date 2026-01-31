import book3 from './tenniel/1book3.jpg';
import book4 from './tenniel/1book4.jpg';

export const images = {
	'1book3': book3,
	'1book4': book4,
} as const;

export type ImageKey = keyof typeof images;

export function isImageKey(value: string) : value is ImageKey {
	return value in images;
}