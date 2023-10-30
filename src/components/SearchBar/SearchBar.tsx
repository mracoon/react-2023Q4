import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveBtn';
import { useSearchParams } from 'react-router-dom';

interface ISearchProps {
  valChange: (val: string) => void;
}

const SearchBar = ({ valChange }: ISearchProps) => {
  const [val, setVal] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  const [, setSearchParams] = useSearchParams();
  const submitHandler = () => {
    const searchVal = val.trim();
    localStorage.setItem('mracoon-search-query', searchVal);
    localStorage.setItem('mracoon-pag-page', '1');
    valChange(searchVal);
    setSearchParams({ page: '1' });
  };

  const handlerEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      setVal(e.target.value);
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
          value={val}
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
