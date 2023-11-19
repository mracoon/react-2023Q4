import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import { mockData } from '../../test/mockData';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { server } from '../../mock/server';
import { BASE_URL } from '../../utils/constants';

describe('Card & Details', () => {
  let container = document.body;
  beforeEach(async () => {
    userEvent.setup();

    await act(async () => {
      container = renderWithProviders(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<ResultsContainer />}></Route>
          </Routes>
        </MemoryRouter>
      ).container;
    });
  });

  it('clicking on a card should open a detailed card component', async () => {
    await waitFor(async () => {
      expect(container.getElementsByClassName('details').length).toBe(0);
      const card = screen.getByText(mockData[0].synopsis ?? '');
      await act(async () => {
        await userEvent.click(card);
      });
      await waitFor(() =>
        expect(container.getElementsByClassName('details').length).toBe(1)
      );
    });
  });

  it('clicking should trigger an additional API call to fetch detailed information', async () => {
    const requestSpy = vi.fn();
    server.events.on('request:start', ({ request }) => {
      requestSpy(request.url);
    });
    await waitFor(async () => {
      const card = screen.getByText(mockData[0].synopsis ?? '');
      const clickedCardId = mockData[0].mal_id;
      vi.clearAllMocks();
      await act(async () => {
        await userEvent.click(card);
      });
      expect(requestSpy).toHaveBeenCalledWith(`${BASE_URL}/${clickedCardId}`);
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
