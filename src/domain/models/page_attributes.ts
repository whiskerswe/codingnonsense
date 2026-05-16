import { z } from "zod";

export const PageAttributesSchema = z.object({
	id: z.string(),
	title: z.string().optional(),
	image: z.string().optional(),
	button_text: z.string().optional(),
	image_width: z.int().optional(),
	image_height: z.int().optional(),
	parameters: z.array(z.string()).optional(),
}).strict();

