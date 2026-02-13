type ImageWithCreditProps = {
    src: string;
    chapterId: string;
    };

export function ImageWithCredit({ src, chapterId}: ImageWithCreditProps) {
    const altText = `Illustration from Alice in Wonderland, chapter ${chapterId}`;
	return (
        <figure>
        <img src={src} alt={altText} className="image-content"/>
        <figcaption className="fig-caption">Illustration by John Tenniel, 1865. Public domain.</figcaption>
        </figure>
        );
    }