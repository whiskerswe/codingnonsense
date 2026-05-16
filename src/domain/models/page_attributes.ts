import { z } from "zod";

export const PageAttributesSchema = z
	.object({
		id: z.string(),
		title: z.string().optional(),
		image: z.string().optional(),
		button_text: z.string().optional(),
		image_width: z.int().optional(),
		image_height: z.int().optional(),
		parameters: z.array(z.string()).optional(),
	})
	.strict()
	.superRefine((data, ctx) => {
		if (data.image) {
			if (data.image_width == null) {
				ctx.addIssue({
					code: "custom",
					path: ["image_width"],
					message: "image_width is required when image is set",
				});
			}
			
			if (data.image_height == null) {
				ctx.addIssue({
					code: "custom",
					path: ["image_height"],
					message: "image_height is required when image is set",
				});
			}
		}
	});