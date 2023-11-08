import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('ErrorBoundary', () => {
  it('should show fallback UI when clicking error button', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      );
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
