type ImageWithCreditProps = {
    src: string;
    alt: string;
    credit: string;
    };

export function ImageWithCredit({ src, alt, credit }: ImageWithCreditProps) {
    return (
        <figure className="image-figure">
        <img src={src} alt={alt} className="image-content"/>
        <figcaption className="Image-credit">{credit}</figcaption>
        </figure>
        );
    }