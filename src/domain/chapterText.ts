import type { ChapterText } from "../types/chapter.ts";

export function joinSentences(sentences: ChapterText) : string {
    return Object.values(sentences)
        .filter(s => s.trim().length > 0)
        .join(' ');
}