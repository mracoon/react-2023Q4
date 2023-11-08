import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { SearchValueContext } from '../SearchPageLayout';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBar', () => {
  userEvent.setup();
  const storage: Record<string, string> = {};

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn((key: string, value: string) => {
          storage[key] = value;
        }),
        getItem: vi.fn((key: string) => storage[key]),
      },
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });
  let searchValue = '';
  const setSearchValue = vi.fn().mockImplementation((newVal: string) => {
    searchValue = newVal;
  });

  it('clicking the Search button should save the entered value to the local storage', async () => {
    act(() => {
      render(
        <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
          <SearchBar />
        </SearchValueContext.Provider>,
        { wrapper: MemoryRouter }
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, 'test query string');
      await userEvent.click(screen.getByText('Search'));
    });
    expect(storage['mracoon-search-query']).toBe('test query string');
  });

  it('should retrieve the value from the local storage upon mounting', () => {
    act(() => {
      render(
        <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
          <SearchBar />
        </SearchValueContext.Provider>,
        { wrapper: MemoryRouter }
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    expect(searchInput.value).toBe(storage['mracoon-search-query']);
  });
});
