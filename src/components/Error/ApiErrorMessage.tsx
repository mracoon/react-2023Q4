import { BiError } from 'react-icons/bi';
import './error.css';

interface IApiErrorMessageProps {
  message: string;
}

export const ApiErrorMessage = ({ message }: IApiErrorMessageProps) => {
  return (
    <div className="api-warn">
      <BiError />
      <span>{message}. Try again</span>
    </div>
  );
};
