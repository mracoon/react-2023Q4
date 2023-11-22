import { act, render, screen } from '@testing-library/react';
import { CardsContainer } from './CardsContainer';
import { mockData } from '../../test/mockData';

describe('CardsContainer', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('component should render the specified number of cards', async () => {
    const container = await act(async () => {
      return render(<CardsContainer cardsData={mockData} />).container;
    });
    expect(container.getElementsByClassName('card').length).toBe(
      mockData.length
    );
  });
  it('should display a message if there are no cards.', () => {
    act(() => {
      render(<CardsContainer cardsData={[]} />).container;
    });
    expect(screen.getByText('no results')).toBeInTheDocument();
  });
  afterAll(() => {
    vi.clearAllMocks();
  });
});
