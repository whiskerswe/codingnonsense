
type ImageWithCreditProps = {
	image_src: string;
	image_width: number;
	image_height: number;
};

export function ImageWithCredit({ image_src, image_width, image_height }: ImageWithCreditProps) {
	const altText = `Illustration from Alice in Wonderland by Sir John Tenniel (1820-1914)`;
	
	return (
		<figure className="text-right">
			<img src={image_src}
				alt={altText}
				width={image_width}
				height={image_height}
				loading="eager"
				fetchPriority="high"
				className="max-h-60 md:max-h-80 w-auto m-4 object-contain"
			/>
		</figure>
	);
}
