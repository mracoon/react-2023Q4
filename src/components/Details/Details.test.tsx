import { act, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { detailsMockData } from '../../test/detailsMockData';
import userEvent from '@testing-library/user-event';
import { Nullable } from '../../types/apiDataTypes';
import { renderWithProviders } from '../../utils/test-utils';

describe('Details', () => {
  userEvent.setup();
  const detailedCardId: Nullable<string> = '123';

  it('a loading indicator should be displayed while fetching data', async () => {
    expect(screen.queryByTestId('loader')).toBeNull();
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            viewModeReducer: { page: 1, detailsId: detailedCardId },
          },
        }
      );
    });

    expect(screen.queryByTestId('loader')).not.toBeNull();
  });

  it('detailed card component should display the detailed card data correctly', async () => {
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            viewModeReducer: { page: 1, detailsId: detailedCardId },
          },
        }
      );
    });

    const title = detailsMockData.title_english || detailsMockData.title;
    await waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByAltText(title)).toBeInTheDocument();
      expect(
        screen.getByText(detailsMockData.synopsis ?? 'no description')
      ).toBeInTheDocument();
    });
  });

  it('clicking the close button should hide the component', async () => {
    const container = await act(async () => {
      return renderWithProviders(
        <MemoryRouter>
          <Details />
        </MemoryRouter>,
        {
          preloadedState: {
            viewModeReducer: { page: 1, detailsId: detailedCardId },
          },
        }
      ).container;
    });

    await waitFor(async () => {
      expect(container.getElementsByClassName('details').length).toBe(1);

      await userEvent.click(screen.getByText('✖'));

      expect(container.getElementsByClassName('details').length).toBe(0);
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
