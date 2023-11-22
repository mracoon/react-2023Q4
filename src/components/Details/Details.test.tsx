import { act, render, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';

import { detailsMockData } from '../../test/detailsMockData';
import userEvent from '@testing-library/user-event';
import { IData, IDataErrors } from '../../types/apiDataTypes';

import { paginationTemplate } from '@/test/paginationTemplate';
import { mockData } from '@/test/mockData';
import createMockRouter from '@/test/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Home from '@/pages';

describe('Details', () => {
  userEvent.setup();

  const data: IData = {
    cardsData: {
      pagination: paginationTemplate,
      data: mockData,
    },
    detailsData: { data: detailsMockData },
  };
  const errors: IDataErrors = { cardsDataError: false, detailsError: false };
  const mockRouter = createMockRouter({
    query: { details: '1' },
  });

  it('detailed card component should display the detailed card data correctly', async () => {
    console.log(mockRouter.query);
    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <Details data={data}></Details>
        </RouterContext.Provider>
      );
    });

    const title = detailsMockData.title_english || detailsMockData.title;
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByAltText(title)).toBeInTheDocument();
      expect(
        screen.getByText(detailsMockData.synopsis ?? 'no description')
      ).toBeInTheDocument();
    });
  });

  it('clicking the close button should render page without details component', async () => {
    const pathname = 'test/path';
    const query = { page: '1', details: '2' };

    const { details, ...queryWithoutDetails } = query;

    const routerParamsWithoutDetails = {
      pathname,
      query: queryWithoutDetails,
    };
    const mockRouter = createMockRouter({ pathname, query });

    const container = await act(async () => {
      return render(
        <RouterContext.Provider value={mockRouter}>
          <Home data={data} errors={errors}></Home>
        </RouterContext.Provider>
      ).container;
    });

    await waitFor(async () => {
      expect(container.getElementsByClassName('details').length).toBe(1);

      await userEvent.click(screen.getByText('✖'));
      expect(mockRouter.push).toBeCalledWith(routerParamsWithoutDetails);
    });

    const mockRouterWithoutDetails = createMockRouter(
      routerParamsWithoutDetails
    );
    const containerWithoutDetails = await act(async () => {
      return render(
        <RouterContext.Provider value={mockRouterWithoutDetails}>
          <Home data={data} errors={errors}></Home>
        </RouterContext.Provider>
      ).container;
    });
    await waitFor(async () => {
      expect(
        containerWithoutDetails.getElementsByClassName('details').length
      ).toBe(0);
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
