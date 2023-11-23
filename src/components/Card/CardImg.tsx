import { ICardImgProps } from './CardTypes';
import Image from 'next/image';
import { blurDataURL } from './imageBlurDataUrl';

export const CardImg = ({ src, title }: ICardImgProps) => {
  return (
    <div className="img-container flex-center h-52 overflow-hidden">
      <Image
        src={src ?? '/ghost.png'}
        alt={title}
        width={225}
        height={300}
        style={{
          width: 225,
          height: 300,
        }}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
};
