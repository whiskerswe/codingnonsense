import { images } from '../assets/images';

export type ChapterText = {
    observe: string;
    uncertainty: string;
    misreflection: string;
    response: string;
    exit: string;
};

export type Chapter = {
    id: string;
    image?: keyof typeof images;
    characters: string[];
    sentences: ChapterText;
};