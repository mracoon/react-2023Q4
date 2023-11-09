import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { StorageKeyName } from '../../utils/constants';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBar', () => {
  const changeStub = vi.fn();
  const storage: Record<string, string> = {};

  beforeAll(() => {
    vi.spyOn(window, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: '111' }),
      } as Response);
    });
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

  it('should render search bar', () => {
    act(() => {
      render(<SearchBar valueChange={changeStub} />, { wrapper: MemoryRouter });
    });
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call the submitHandler when press Enter and save query in ls', async () => {
    userEvent.setup();
    act(() => {
      render(<SearchBar valueChange={changeStub} />, { wrapper: MemoryRouter });
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, 'test query string{enter}');
    });
    await waitFor(() => expect(changeStub).toHaveBeenCalled());
    expect(storage[StorageKeyName.search]).toBe('test query string');
  });
});
