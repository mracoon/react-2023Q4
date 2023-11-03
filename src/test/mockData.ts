import { RequestItem } from '../types/apiDataTypes';
import dataTemplate from './dataTemplate';

const data: Partial<RequestItem>[] = [
  {
    title: 'Naruto',
    title_english: 'Naruto',
    synopsis: 'Naruto description',
    duration: '23 min',
    score: 8,
  },
  {
    title: 'Totoro',
    title_english: 'My Neighbour Totoro',
    synopsis: 'Totoro description',
    duration: '1 hr 26 min',
    score: 8.25,
  },
  {
    title: 'Sen to Chihiro no Kamikakushi',
    title_english: 'Spirited away',
    synopsis: 'Spirited away description',
    duration: '2 hr 4 min',
    score: 8.78,
  },
];
export const mockData: RequestItem[] = data.map((item) => ({
  ...dataTemplate,
  ...item,
}));
