export type RawChapter = {
	id: string;
	image?: string;
	characters: string[];
	title?: string;
	sentences: Record<string, string>;
	text_decoration?: Record<string, string[]>;
	button_text?: string;
};