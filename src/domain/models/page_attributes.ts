import { z } from "zod";

export const PageAttributesSchema = z.object({
	id: z.string(),
	title: z.string(),
	image: z.string(),
	button_text: z.string().optional(),
	width: z.string().nullable().optional(),
	height: z.string().nullable().optional(),
}).strict();
