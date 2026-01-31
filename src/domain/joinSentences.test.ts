import { describe, expect, it } from 'vitest';
import { joinSentences } from "./chapterText.ts";

describe("joinSentences", () => {
	it('joins only non empty sentences in order', () => {
		const sentences = {
			observe: 'A',
			uncertainty: '',
			misreflection: 'B',
			response: '',
			exit: 'C'
		};
		expect(joinSentences(sentences)).toBe('A B C')
		});
	it('returns an empty string if all sentences are empty', () => {
		const sentences = {
			observe: '',
			uncertainty: '',
			misreflection: '',
			response: '',
			exit: ''
		};
		expect(joinSentences(sentences)).toBe('');
		});
});