import React from 'react';
//import './limit.css';
import { limitSlice } from '../../store/reducers/LimitSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
//import { useSearchParams } from 'react-router-dom';
import { StorageKeyName } from '../../utils/constants';
import { viewModeSlice } from '../../store/reducers/ViewModeSlice';

export const Limit = () => {
  const { changePage } = viewModeSlice.actions;
  // const [, setSearchParams] = useSearchParams();
  const { setLimitValue } = limitSlice.actions;
  const { limitValue } = useAppSelector((state) => state.limitReducer);
  const dispatch = useAppDispatch();

  const changeLumitValHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setLimitValue(+event.target.value));
    dispatch(changePage(1));
    //  setSearchParams({ page: '1' });
    localStorage.setItem(StorageKeyName.limit, event.target.value);
    localStorage.setItem(StorageKeyName.pagination, '1');
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
          <option value="3">3</option>
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
