import React, { useRef } from 'react';
import { KeyboardEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveButton';

import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const { query } = router;
  const { limit } = query;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const searchValue = searchInputRef.current?.value.trim() ?? '';
    console.log(searchValue);
    router.push({ query: { page: 1, searchValue, limit: limit || 1 } });
  };

  const handlerEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
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
          onKeyUp={handlerEnter}
          ref={searchInputRef}
          defaultValue={(router.query.searchValue || '').toString()}
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
