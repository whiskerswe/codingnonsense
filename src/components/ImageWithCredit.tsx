type ImageWithCreditProps = {
    src: string;
    alt: string;
    credit: string;
    };

export function ImageWithCredit({ src, alt, credit }: ImageWithCreditProps) {
    return (
        <figure>
        <img src={src} alt={alt} className="image-content"/>
        <figcaption className="fig-caption">{credit}</figcaption>
        </figure>
        );
    }