type ImageWithCreditProps = {
    src: string;
    alt: string;
    credit: string;
    };

export function ImageWithCredit({ src, alt, credit }: ImageWithCreditProps) {
    return (
        <figure>
        <img src={src} alt={alt} className="block mx-auto h-[24rem]"/>
        <figcaption className="mt-2 text-right text-xs italic text-gray-800">{credit}</figcaption>
        </figure>
        );
    }