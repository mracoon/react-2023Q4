import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockData } from '../../test/mockData';
import createMockRouter from '@/test/createMockRouter';
import Home from '@/pages';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { detailsMockData } from '@/test/detailsMockData';
import { paginationTemplate } from '@/test/paginationTemplate';
import { IData, IDataErrors } from '@/types/apiDataTypes';

import { CardsContainer } from './CardsContainer';

describe('Card & Details', () => {
  beforeEach(async () => {
    userEvent.setup();
  });

  const data: IData = {
    cardsData: {
      pagination: paginationTemplate,
      data: mockData,
    },
    detailsData: { data: detailsMockData },
  };
  const errors: IDataErrors = { cardsDataError: false, detailsError: false };
  it('clicking the card  should render page with details component', async () => {
    const pathname = 'test';
    const query = { page: '1' };

    const queryWithDetails = { ...query, details: `${mockData[0].mal_id}` };

    const routerParamsWithDetails = {
      pathname,
      query: queryWithDetails,
    };
    const mockRouter = createMockRouter({ pathname, query });

    await act(async () => {
      return render(
        <RouterContext.Provider value={mockRouter}>
          <CardsContainer cardsData={mockData} />
        </RouterContext.Provider>
      ).container;
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByText(mockData[0].synopsis ?? ''));
      expect(mockRouter.push).toBeCalledWith(routerParamsWithDetails);
    });

    const mockRouterWithDetails = createMockRouter(routerParamsWithDetails);
    const containerWithDetails = await act(async () => {
      return render(
        <RouterContext.Provider value={mockRouterWithDetails}>
          <Home data={data} errors={errors}></Home>
        </RouterContext.Provider>
      ).container;
    });
    await waitFor(async () => {
      expect(
        containerWithDetails.getElementsByClassName('details').length
      ).toBe(1);
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
