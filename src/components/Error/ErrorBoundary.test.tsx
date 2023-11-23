import { act, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Home from '../../pages';
import { IData, IDataErrors } from '../../types/apiDataTypes';
import { paginationTemplate } from '../../test/paginationTemplate';
import { mockData } from '../../test/mockData';
import { detailsMockData } from '../../test/detailsMockData';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: () => {},
    };
  },
}));

describe('ErrorBoundary', () => {
  console.log = vi.fn();
  console.error = vi.fn();
  console.warn = vi.fn();

  it('should show fallback UI when clicking error button', async () => {
    const data: IData = {
      cardsData: {
        pagination: paginationTemplate,
        data: mockData,
      },
      detailsData: { data: detailsMockData },
    };
    const errors: IDataErrors = { cardsDataError: false, detailsError: false };
    act(() => {
      render(<Home data={data} errors={errors} />);
    });
    const errorButton = screen.getByRole('button', { name: 'ERROR' });
    expect(errorButton).toBeInTheDocument();
    userEvent.setup();

    await act(async () => {
      await userEvent.click(errorButton);
    });

    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
  });
});
