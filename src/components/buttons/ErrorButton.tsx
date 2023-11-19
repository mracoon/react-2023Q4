import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import ResponsiveButton from './ResponsiveButton';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  function makeError() {
    setHasError(true);
  }

  if (hasError) {
    throw new Error('test error');
  }

  return (
    <ResponsiveButton
      classes="bg-red-800"
      text="ERROR"
      icon={BiErrorCircle}
      onClickHandler={makeError}
    />
  );
};
