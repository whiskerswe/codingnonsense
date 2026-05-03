import { z } from "zod";

export const PageAttributesSchema = z.object({
	id: z.string(),
	title: z.string(),
	image: z.string(),
	button_text: z.string().optional(),
	image_width: z.int(),
	image_height: z.int(),
	parameters: z.array(z.string()).optional(),
}).strict();
