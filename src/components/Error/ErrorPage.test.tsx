import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('404 Page', () => {
  userEvent.setup();
  window.history.pushState({}, '404 page', '/page404');
  it(' 404 page should be displayed when navigating to an invalid route', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
