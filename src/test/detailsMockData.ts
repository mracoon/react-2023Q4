import {
  AiringStatus,
  AnimeRating,
  AnimeType,
  RequestItem,
} from '../types/apiDataTypes';
import dataTemplate from './dataTemplate';

const data: Partial<RequestItem> = {
  mal_id: 1,
  title: 'Naruto',
  title_english: 'Naruto',
  synopsis: 'Naruto description',
  duration: '23 min',
  score: 8,
  rating: AnimeRating.Rp,
  status: AiringStatus.currently,
  type: AnimeType.movie,
  episodes: 5,
  studios: [
    {
      mal_id: 1,
      type: '',
      name: 'Gainax',
      url: '',
    },
    {
      mal_id: 2,
      type: '',
      name: 'Production I.G',
      url: '',
    },
  ],
  genres: [
    {
      mal_id: 1,
      type: '',
      name: 'Comedy',
      url: '',
    },
    {
      mal_id: 2,
      type: '',
      name: 'Supernatural',
      url: '',
    },
  ],
};

export const detailsMockData: RequestItem = {
  ...dataTemplate,
  ...data,
};
