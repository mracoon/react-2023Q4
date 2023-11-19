import { act, screen } from '@testing-library/react';
import { CardsContainer } from './CardsContainer';
import { mockData } from '../../test/mockData';
import { renderWithProviders } from '../../utils/test-utils';

describe('CardsContainer', () => {
  const cardClickHandlerStub = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component should render the specified number of cards', async () => {
    const container = await act(async () => {
      return renderWithProviders(
        <CardsContainer
          cardsData={mockData}
          cardClickHandler={cardClickHandlerStub}
        />
      ).container;
    });
    expect(container.getElementsByClassName('card').length).toBe(
      mockData.length
    );
  });
  it('should display a message if there are no cards.', () => {
    act(() => {
      renderWithProviders(
        <CardsContainer
          cardsData={[]}
          cardClickHandler={cardClickHandlerStub}
        />
      ).container;
    });
    expect(screen.getByText('no results')).toBeInTheDocument();
  });
  afterAll(() => {
    vi.clearAllMocks();
  });
});
