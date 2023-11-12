import { act, render, screen, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { MemoryRouter } from 'react-router-dom';
import { detailsMockData } from '../../test/detailsMockData';
import userEvent from '@testing-library/user-event';
import { Nullable } from '../../types/apiDataTypes';

const { mockedMethod } = vi.hoisted(() => {
  return {
    mockedMethod: vi.fn(() => {
      return new Promise((resolve) => resolve({ data: detailsMockData }));
    }),
  };
});

vi.mock('../../utils/API', () => {
  return { getApiData: mockedMethod };
});

mockedMethod.mockImplementationOnce(() => {
  return new Promise((resolve) =>
    setTimeout(resolve, 1000, { data: detailsMockData })
  );
});

describe('Details', () => {
  userEvent.setup();
  let detailedCardId: Nullable<number> = 1;
  const cardClickHandlerStub = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('a loading indicator should be displayed while fetching data', async () => {
    expect(screen.queryByTestId('loader')).toBeNull();
    await act(async () => {
      render(
        <MemoryRouter>
          <Details detailCardId={1} cardClickHandler={cardClickHandlerStub} />
        </MemoryRouter>
      );
    });
    expect(screen.queryByTestId('loader')).not.toBeNull();
  });

  it('detailed card component should display the detailed card data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Details detailCardId={1} cardClickHandler={cardClickHandlerStub} />
        </MemoryRouter>
      );
    });

    const title = detailsMockData.title_english || detailsMockData.title;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(
      screen.getByText(detailsMockData.synopsis ?? 'no description')
    ).toBeInTheDocument();
  });

  it('clicking the close button should hide the component', async () => {
    cardClickHandlerStub.mockImplementation((id: Nullable<number>) => {
      detailedCardId = id;
    });
    let container = document.body;
    await act(async () => {
      container = render(
        <MemoryRouter>
          <Details
            detailCardId={detailedCardId}
            cardClickHandler={cardClickHandlerStub}
          />
        </MemoryRouter>
      ).container;
    });

    expect(container.getElementsByClassName('details').length).toBe(1);
    await act(async () => {
      await userEvent.click(screen.getByText('✖'));
    });

    await waitFor(async () => {
      expect(cardClickHandlerStub).toBeCalledWith(null);
    });
    await act(async () => {
      container = render(
        <MemoryRouter>
          <Details
            detailCardId={detailedCardId}
            cardClickHandler={cardClickHandlerStub}
          />
        </MemoryRouter>
      ).container;
    });
    expect(container.getElementsByClassName('details').length).toBe(0);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
