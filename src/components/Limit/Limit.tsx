import { useState } from 'react';
import './limit.css';

export const Limit = ({
  applyLimit,
}: {
  applyLimit: (limit: number) => void;
}) => {
  const [currentLimitVal, setCurrentLimitVal] = useState(
    +(localStorage.getItem('mracoon-items-limit') ?? 3)
  );
  const changeLumitValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLimitVal(Math.max(Math.min(+e.target.value, 25), 1));
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
