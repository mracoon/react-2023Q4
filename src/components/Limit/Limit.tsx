import './limit.css';
import { limitSlice } from '../../store/reducers/LimitSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useSearchParams } from 'react-router-dom';

export const Limit = () => {
  const [, setSearchParams] = useSearchParams();
  const { setLimitValue } = limitSlice.actions;
  const { limitValue } = useAppSelector((state) => state.limitReducer);
  const dispatch = useAppDispatch();

  const changeLumitValHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setLimitValue(+event.target.value));
    setSearchParams({ page: '1' });
  };

  return (
    <div className="limit-container flex-center gap-4">
      <label>
        Limit:{' '}
        <select
          name="limit"
          onChange={changeLumitValHandler}
          value={limitValue ?? 1}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </label>
    </div>
  );
};
