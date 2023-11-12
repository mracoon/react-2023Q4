import { ChangeEvent, KeyboardEvent, useState, useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveButton';
import { useSearchParams } from 'react-router-dom';
import { StorageKeyName } from '../../utils/constants';
import { SearchValueContext } from '../SearchPageLayout';

const SearchBar = () => {
  const { setSearchValue } = useContext(SearchValueContext);

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
    setSearchValue(searchValue);
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
