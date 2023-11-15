import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

import { MemoryRouter } from 'react-router-dom';
import { StorageKeyName } from '../../utils/constants';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

describe('SearchBar', () => {
  userEvent.setup();
  const storage: Record<string, string> = {};
  const store = setupStore();

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

  it('clicking the Search button should save the entered value to the local storage', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <SearchBar />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, 'test query string');
      await userEvent.click(screen.getByText('Search'));
    });
    expect(storage[StorageKeyName.search]).toBe('test query string');
  });

  it('should retrieve the value from the local storage upon mounting', () => {
    act(() => {
      render(
        <Provider store={store}>
          <SearchBar />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    expect(searchInput.value).toBe(storage[StorageKeyName.search]);
  });
});
