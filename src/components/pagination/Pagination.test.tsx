import { act, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { paginationTemplate } from '../../test/paginationTemplate';

describe('Pagination', () => {
  userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('should update URL query parameter when page changes', async () => {
    const startPage = 5;
    beforeEach(() => {
      act(() => {
        render(
          <Pagination
            paginationInfo={{
              ...paginationTemplate,
              last_visible_page: startPage + 2,
              has_next_page: true,
              current_page: startPage,
            }}
          />,
          { wrapper: BrowserRouter }
        );
      });
    });

    it('next button', async () => {
      const nextButton = screen.getByText('next');

      expect(nextButton).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(nextButton);
      });
      expect(location.search).toBe(`?page=${startPage + 1}`);
    });

    it('prev button', async () => {
      expect(screen.getByText('prev')).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(screen.getByText('prev'));
      });
      expect(location.search).toBe(`?page=${startPage - 1}`);
    });
  });
});
