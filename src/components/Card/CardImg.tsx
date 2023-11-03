import { useState } from 'react';
import { ICardImgProps } from './CardTypes';

export const CardImg = ({ src, title }: ICardImgProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const loadHandler = () => {
    setIsLoading(false);
  };

  return (
    <div className="img-container flex-center h-52 overflow-hidden">
      {isLoading && <div className="loader"></div>}
      <img
        style={{ display: isLoading ? 'none' : 'block' }}
        src={src ?? ''}
        alt={title}
        onLoad={loadHandler}
      />
    </div>
  );
};
