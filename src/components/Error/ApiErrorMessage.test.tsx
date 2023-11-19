import { act, render, screen } from '@testing-library/react';
import { ApiErrorMessage } from './ApiErrorMessage';

describe('ApiErrorMessage', () => {
  it('should show error message', () => {
    act(() => {
      render(<ApiErrorMessage></ApiErrorMessage>);
    });

    expect(
      screen.getByText(`Something went wrong. Try again`)
    ).toBeInTheDocument();
  });
});
