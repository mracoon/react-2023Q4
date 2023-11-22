import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import createMockRouter from '@/test/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('SearchBar', () => {
  userEvent.setup();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clicking the Search button should set search parameters', async () => {
    const mockRouter = createMockRouter({});
    act(() => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <SearchBar />
        </RouterContext.Provider>
      );
    });
    const searchInput = screen.getByRole<HTMLInputElement>('searchbox');
    await act(async () => {
      await userEvent.type(searchInput, 'test query string');
      await userEvent.click(screen.getByText('Search'));
    });
    await waitFor(() => {
      expect(mockRouter.push).toBeCalledWith({
        query: { page: 1, searchValue: 'test query string', limit: 1 },
      });
    });
  });
});
