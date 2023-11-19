import React from 'react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveButton';
import { useSearchParams } from 'react-router-dom';
import { StorageKeyName } from '../../utils/constants';
import { useAppDispatch } from '../../hooks/redux';
import { searchSlice } from '../../store/reducers/SearchSlice';
import { viewModeSlice } from '../../store/reducers/ViewModeSlice';

const SearchBar = () => {
  const { setSearchValue } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const { changeDetails, changePage } = viewModeSlice.actions;

  const [value, setValue] = useState(
    localStorage.getItem(StorageKeyName.search) ?? ''
  );
  const [, setSearchParams] = useSearchParams();
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = () => {
    const searchValue = value.trim();
    localStorage.setItem(StorageKeyName.search, searchValue);
    localStorage.setItem(StorageKeyName.pagination, '1');
    dispatch(changePage(1));
    dispatch(setSearchValue(searchValue));
    dispatch(changeDetails(null));
    setSearchParams({ page: '1' });
  };

  const handlerEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      setValue(event.target.value);
      submitHandler();
    }
  };

  return (
    <>
      <div className="w-full flex gap-2 justify-between items-center">
        <input
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          type="search"
          placeholder="Search anime"
          onChange={handlerChange}
          onKeyUp={handlerEnter}
          value={value}
        />
        <ResponsiveBtn
          classes="bg-indigo-600"
          text="Search"
          icon={AiOutlineSearch}
          onClickHandler={submitHandler}
        />
      </div>
    </>
  );
};

export default SearchBar;
