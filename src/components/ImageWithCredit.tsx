import { useState } from "react";

type ImageWithCreditProps = {
	image_src: string;
	image_width: number;
	image_height: number;
};

export function ImageWithCredit({ image_src, image_width, image_height }: ImageWithCreditProps) {
	const [open, setOpen] = useState(false);
	const altText = `Illustration from Alice in Wonderland by Sir John Tenniel (1820-1914)`;
	
	return (
		<figure className="text-right">
			<img src={image_src}
				alt={altText}
				width={image_width}
				height={image_height}
				loading="eager"
				fetchPriority="high"
				className="mx-auto max-w-40 md:max-w-90 mt-2 max-h-80 lg:max-h-90 w-full h-auto"
			/>
	<button
		className="mb-1 text-xs text-gray-700 italic underline"
		onClick={() => setOpen(true)}
	>
		Tenniel
	</button>

{
	open && (
		<div
			className="fixed inset-0 bg-black/40 flex items-center justify-center"
					onClick={() => setOpen(false)}
				>
					<div
						className="bg-white p-5 max-w-sm border border-gray-300 text-sm text-center"
						onClick={(e) => e.stopPropagation()}
					>
						<p>
							Illustration by John Tenniel (1820–1914).
							Public domain.
						</p>
					</div>
				</div>
			)}
		</figure>
	);
}
