import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  const changeStub = vi.fn();
  const loadingStub = vi.fn();
  const storage: Record<string, string> = {};

  beforeAll(() => {
    vi.spyOn(window, 'fetch').mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: [1, 2, 3] }),
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
    render(<SearchBar change={changeStub} loading={loadingStub}></SearchBar>);
  });

  it('should render search bar', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should call the submitHandler when press Enter', async () => {
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, '{enter}');
    expect(changeStub).toBeCalledWith([1, 2, 3]);
  });

  it('should save query in localStorage', async () => {
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, '123{enter}');
    expect(storage['maracoon-serch-query']).toBe('123');
  });
});
