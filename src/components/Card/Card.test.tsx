import { act, render, screen } from '@testing-library/react';
import { mockData } from '../../test/mockData';
import Card from './Card';

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the relevant card data', () => {
    const { title, title_english, synopsis, duration, score } = mockData[0];
    act(() => {
      render(<Card data={mockData[0]} />);
    });
    expect(screen.getByText(`${score}`)).toBeInTheDocument();
    expect(screen.getByText(`${duration}`)).toBeInTheDocument();
    expect(screen.getByText(`${synopsis}`)).toBeInTheDocument();
    expect(screen.getByText(`${title_english || title}`)).toBeInTheDocument();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
