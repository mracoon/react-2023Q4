import { act, render, screen } from '@testing-library/react';
import { CardsContainer } from './CardsContainer';
import { CardsDataContext } from '../ResultsContainer/ResultsContainer';
import { mockData } from '../../test/mockData';

describe('CardsContainer', () => {
  const cardClickHandlerStub = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component should render the specified number of cards', () => {
    let container = document.body;
    act(() => {
      container = render(
        <CardsDataContext.Provider value={mockData}>
          <CardsContainer cardClickHandler={cardClickHandlerStub} />
        </CardsDataContext.Provider>
      ).container;
    });
    expect(container.getElementsByClassName('card').length).toBe(
      mockData.length
    );
  });
  it('should display a message if there are no cards.', () => {
    act(() => {
      render(
        <CardsDataContext.Provider value={[]}>
          <CardsContainer cardClickHandler={cardClickHandlerStub} />
        </CardsDataContext.Provider>
      ).container;
    });
    expect(screen.getByText('no results')).toBeInTheDocument();
  });
  afterAll(() => {
    vi.clearAllMocks();
  });
});
