import './Card.css';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillStarFill } from 'react-icons/bs';
import { RequestItem } from '../../types/apiDataTypes';
import { CardImg } from './CardImg';

interface ICardProps {
  data: RequestItem;
}
const Card = ({ data }: ICardProps) => {
  const title = data.title_english || data.title;
  const { score, duration, synopsis } = data;

  return (
    <div className="card max-w-xs w-full py-2">
      <CardImg src={data.images.webp.image_url} title={title}></CardImg>
      <div className="card-body flex flex-auto flex-col gap-2 py-2 px-8">
        <h2 className="card-title">{title} </h2>
        <div className="flex justify-between items-center">
          <p className="self-start card-info">
            <BiTimeFive className="icon" />
            {duration}
          </p>
          {score && (
            <p className="card-info self-end">
              <BsFillStarFill className="icon" />
              {score}
            </p>
          )}
        </div>
        <p className="card-description">{synopsis ?? 'no description'}</p>
        <div className="flex-center flex-wrap gap-1 h-11 overflow-hidden">
          {data.genres.map((genre) => (
            <div key={`genres-${genre.mal_id}`} className="genre">
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
