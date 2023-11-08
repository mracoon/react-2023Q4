import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import { mockData } from '../../test/mockData';
import { SearchValueContext } from '../SearchPageLayout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { detailsMockData } from '../../test/detailsMockData';

const { mockedMethod } = vi.hoisted(() => {
  return {
    mockedMethod: vi.fn(),
  };
});

vi.mock('../../utils/API', () => {
  return { getApiData: mockedMethod };
});

describe('Card & Details', () => {
  let container = document.body;
  beforeEach(async () => {
    userEvent.setup();
    mockedMethod
      .mockImplementationOnce(() => {
        return Promise.resolve({ data: mockData });
      })
      .mockImplementationOnce(() => {
        return new Promise((resolve) =>
          setTimeout(resolve, 1000, { data: detailsMockData })
        );
      });
    await act(async () => {
      container = render(
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SearchValueContext.Provider
                  value={{ searchValue: 'test', setSearchValue: () => {} }}
                >
                  <ResultsContainer />
                </SearchValueContext.Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>
      ).container;
    });
  });

  it('clicking on a card should open a detailed card component', async () => {
    expect(container.getElementsByClassName('details').length).toBe(0);
    const card = screen.getByText(mockData[0].synopsis ?? '');
    await act(async () => {
      await userEvent.click(card);
    });
    await waitFor(() =>
      expect(container.getElementsByClassName('details').length).toBe(1)
    );
  });

  it('clicking should trigger an additional API call to fetch detailed information', async () => {
    const card = screen.getByText(mockData[0].synopsis ?? '');
    vi.clearAllMocks();
    await act(async () => {
      await userEvent.click(card);
    });
    await waitFor(async () => expect(mockedMethod).toHaveBeenCalled());
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
