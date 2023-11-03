import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

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
      render(<SearchBar valChange={changeStub} />);
    });
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call the submitHandler when press Enter and save query in ls', async () => {
    userEvent.setup();
    act(() => {
      render(<SearchBar valChange={changeStub} />);
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, 'test query string{enter}');
    });
    await waitFor(() => expect(changeStub).toHaveBeenCalled());
    expect(storage['mracoon-search-query']).toBe('test query string');
  });
});
