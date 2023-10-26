import { useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import ResponsiveBtn from './ResponsiveBtn';

export const ErrorBtn = () => {
  const [hasError, setHasError] = useState(false);

  function makeErr() {
    setHasError(true);
  }

  if (hasError) {
    throw new Error('test error');
  }

  return (
    <ResponsiveBtn
      classes="bg-red-800"
      text="ERROR"
      icon={BiErrorCircle}
      onClickHandler={makeErr}
    />
  );
};
