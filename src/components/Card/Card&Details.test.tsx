import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import { mockData } from '../../test/mockData';
import { SearchValueContext } from '../SearchPageLayout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const { mockedMethod } = vi.hoisted(() => {
  return { mockedMethod: vi.fn() };
});

vi.mock('../../utils/API', () => {
  return { getApiData: mockedMethod };
});

describe('Card & Details', () => {
  beforeEach(async () => {
    userEvent.setup();
    mockedMethod
      .mockImplementationOnce(() => {
        return Promise.resolve({ data: mockData });
      })
      .mockImplementationOnce(() => {
        return new Promise((resolve) =>
          setTimeout(resolve, 1000, { data: mockData[0] })
        );
      });
    await act(async () => {
      render(
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
      );
    });
  });

  it('clicking on a card should open a detailed card component', async () => {
    expect(screen.queryByText(`✖`)).toBeNull();
    const card = screen.getByText(mockData[0].synopsis ?? '');
    await act(async () => {
      await userEvent.click(card);
    });
    await waitFor(() => expect(screen.getByText(`✖`)).toBeInTheDocument());
  });

  it('clicking should trigger an additional API call to fetch detailed information', async () => {
    const card = screen.getByText(mockData[0].synopsis ?? '');
    vi.clearAllMocks();
    await act(async () => {
      await userEvent.click(card);
    });
    await waitFor(() => expect(mockedMethod).toHaveBeenCalled());
  });

  it('loading indicator should be displayed while fetching data', async () => {
    const card = screen.getByText(mockData[0].synopsis ?? '');
    expect(screen.queryByTestId('loader')).toBeNull();
    await act(async () => {
      await userEvent.click(card);
    });
    expect(screen.queryByTestId('loader')).not.toBeNull();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
