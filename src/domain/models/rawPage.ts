export type RawPage = {
	id: string;
	image?: string;
	title: string;
	sentences: Record<string, string>;
	text_decoration?: Record<string, string[]>;
	button_text?: string;
};
