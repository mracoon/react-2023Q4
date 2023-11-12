import { act, render, screen } from '@testing-library/react';
import { detailsMockData } from '../../test/detailsMockData';
import { DetailsInfo } from './DetailsInfo';

describe('DetailsInfo', () => {
  it('should display the detailed info data correctly', async () => {
    await act(async () => {
      render(<DetailsInfo detailData={detailsMockData} />);
    });

    const studios = detailsMockData.studios
      .map((studio) => studio.name)
      .join(', ');

    expect(screen.getByText(`${detailsMockData.type}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsMockData.status}`)).toBeInTheDocument();
    expect(screen.getByText(`${studios}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsMockData.duration}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsMockData.episodes}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsMockData.score}`)).toBeInTheDocument();
    expect(screen.getByText(`${detailsMockData.rating}`)).toBeInTheDocument();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
