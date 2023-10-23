import { Component } from 'react';
import './Card.css';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillStarFill } from 'react-icons/bs';
import { RequestItem } from '../../types/apiDataTypes';
import { CardImg } from './CardImg';

interface ICardProps {
  data: RequestItem;
}

interface ICardState {
  loading: boolean;
}
export default class Card extends Component<ICardProps> {
  state: ICardState = {
    loading: true,
  };

  render() {
    const { data } = this.props;
    const title = data.title_english || data.title;
    const { score, duration, synopsis } = data;
    return (
      <div className="card max-w-xs w-full py-2">
        <CardImg src={data.images.webp.image_url} title={title}></CardImg>
        <div className="card-body flex flex-auto flex-col gap-2 py-2 px-8">
          <h2 className="card-title">{title} </h2>
          <div className="flex justify-between items-center">
            <p className=" self-start grow-0 flex items-center gap-1">
              <BiTimeFive className="inline-block fill-blue-800 w-5 h-5" />
              {duration}
            </p>
            {score && (
              <p className="grow-0 self-end flex items-center gap-1">
                <BsFillStarFill className="inline-block fill-blue-800 w-5 h-5 " />
                {score}
              </p>
            )}
          </div>
          <p className="card-description">{synopsis ?? 'no description'}</p>
          <div className="flex flex-wrap gap-1 h-11 overflow-hidden items-center">
            {data.genres.map((genre) => (
              <div
                key={`genres-${genre.mal_id}`}
                className="flex-auto bg-indigo-600 genre"
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
