import { useState } from "react";

type ImageWithCreditProps = {
    src: string;
    chapterId: string;
    };

export function ImageWithCredit({ src, chapterId }: ImageWithCreditProps) {
	const [open, setOpen] = useState(false);
	
	const altText = `Illustration from Alice in Wonderland, chapter ${chapterId}`;
	
	return (
		<figure className="text-right">
			<img src={src} alt={altText} className="image-content mx-auto" />
			<button
				className="mb-2 mr-6 text-xs text-gray-700 italic underline"
				onClick={() => setOpen(true)}
			>
				Tenniel
			</button>
			
			{open && (
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