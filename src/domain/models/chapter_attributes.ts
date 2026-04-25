import { z } from "zod";

export type ChapterAttributes = z.infer<typeof ChapterAttributesSchema>;

export const ChapterAttributesSchema = z.object({
	id: z.string(),
	title: z.string().optional(),
	image: z.string(),
	characters: z.array(z.string()).optional(),
	parameters: z.array(z.string()).optional(),
	themes: z.array(z.string()).optional(),
	button_text: z.string().optional(),
}).strict();