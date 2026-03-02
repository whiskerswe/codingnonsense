import { describe, expect, it } from 'vitest';
import type { RawChapter } from "../models/rawChapter.ts";
import { mapTextWithStyling } from "./chapterText.ts";

describe("joinSentences", () => {
	it('maps only non empty sentences in correct order', () => {
		const raw = {
			id: "1",
			characters: [],
			sentences: {
				observe: 'A',
				uncertainty: '',
				misreflection: 'B',
				response: '',
				exit: 'C'
			}
		} as RawChapter;
		
		const result = mapTextWithStyling(raw);
		
		expect(result.map(s => s.text)).toEqual(['A', 'B', 'C']);
	})
	it('maps text and styling correctly', () => {
		const raw: RawChapter = {
			id: "1",
			characters: [],
			sentences: {
				observe: 'A',
				uncertainty: '',
				misreflection: 'B',
				response: '',
				exit: 'C'
			},
			text_decoration: {
				misreflection: ['italics'],
				exit: ['new_line']
			}
		};
		
		const result = mapTextWithStyling(raw);
		
		expect(result).toEqual([
			{ text: 'A', decoration: [] },
			{ text: 'B', decoration: ['italics'] },
			{ text: 'C', decoration: ['new_line'] }
		]);
	});
});