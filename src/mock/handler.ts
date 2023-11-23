import { HttpHandler, HttpResponse, http } from 'msw';
import { BASE_URL } from '../utils/constants';
import { detailsMockData } from '../test/detailsMockData';
import { mockData } from '../test/mockData';

export const handlers: HttpHandler[] = [
  http.get(`${BASE_URL}/:id`, () => {
    return HttpResponse.json({ data: detailsMockData });
  }),

  http.get(`${BASE_URL}`, () => {
    return HttpResponse.json({
      data: mockData,
    });
  }),
];
