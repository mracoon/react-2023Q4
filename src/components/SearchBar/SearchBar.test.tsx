import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const changeStub = vi.fn();
  const loadingStub = vi.fn();
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
    render(<SearchBar change={changeStub} loading={loadingStub}></SearchBar>);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call the submitHandler when press Enter and save query in ls', async () => {
    render(<SearchBar change={changeStub} loading={loadingStub} />);
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.change(searchInput, { target: { value: 'test query string' } });
    fireEvent.keyUp(searchInput, {
      key: 'Enter',
    });
    await waitFor(() => expect(changeStub).toHaveBeenCalled());
    expect(storage['mracoon-search-query']).toBe('test query string');
  });
});
