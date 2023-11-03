import { useState } from 'react';
import './limit.css';
import { MAX_LIMIT } from '../../utils/constants';

interface ILimitProps {
  applyLimit: (limit: number) => void;
}

export const Limit = ({ applyLimit }: ILimitProps) => {
  const [currentLimitVal, setCurrentLimitVal] = useState(
    +(localStorage.getItem('mracoon-items-limit') ?? 1)
  );
  const changeLumitValHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentLimitVal(Math.max(Math.min(+event.target.value, MAX_LIMIT), 1));
  };
  return (
    <div className="limit-container flex-center gap-4">
      <label>Limit: </label>
      <input
        className="limit-input w-12 px-2"
        type="number"
        name="limit"
        value={currentLimitVal}
        onChange={changeLumitValHandler}
      />{' '}
      <span> / 25</span>
      <button
        onClick={() => {
          applyLimit(currentLimitVal);
        }}
      >
        Apply
      </button>
    </div>
  );
};
