import { BiError } from 'react-icons/bi';
import './error.css';

export const ApiErrorMessage = () => {
  return (
    <div className="api-warn">
      <BiError />
      <p>Something went wrong. Try again</p>
    </div>
  );
};
