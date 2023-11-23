import { act, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

import userEvent from '@testing-library/user-event';
import { paginationTemplate } from '../../test/paginationTemplate';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '@/test/createMockRouter';

describe('Pagination', () => {
  userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('should update URL query parameter when page changes', async () => {
    const startPage = 5;
    const query = { page: `${startPage}`, limit: '1', details: '1' };
    const mockRouter = createMockRouter({ query });

    beforeEach(() => {
      act(() => {
        render(
          <RouterContext.Provider value={mockRouter}>
            <Pagination
              paginationInfo={{
                ...paginationTemplate,
                last_visible_page: startPage + 2,
                has_next_page: true,
                current_page: startPage,
              }}
            />
          </RouterContext.Provider>
        );
      });
    });

    it('next button', async () => {
      const nextButton = screen.getByText('next');

      expect(nextButton).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(nextButton);
      });
      expect(mockRouter.push).toBeCalledWith({
        query: { ...query, page: `${startPage + 1}` },
      });
    });

    it('prev button', async () => {
      expect(screen.getByText('prev')).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(screen.getByText('prev'));
      });
      expect(mockRouter.push).toBeCalledWith({
        query: { ...query, page: `${startPage - 1}` },
      });
    });
  });
});
