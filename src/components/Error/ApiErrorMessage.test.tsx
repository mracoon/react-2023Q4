import { act, render, screen } from '@testing-library/react';
import { ApiErrorMessage } from './ApiErrorMessage';

describe('ApiErrorMessage', () => {
  it('should show error message', () => {
    const errorMessage = 'test error message';
    act(() => {
      render(<ApiErrorMessage message={errorMessage}></ApiErrorMessage>);
    });

    expect(screen.getByText(`${errorMessage}. Try again`)).toBeInTheDocument();
  });
});
