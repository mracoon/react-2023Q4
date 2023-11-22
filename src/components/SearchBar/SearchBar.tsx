import React from 'react';
import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ResponsiveBtn from '../buttons/ResponsiveButton';

import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const { query } = router;
  const { limit } = query;
  const [value, setValue] = useState((query.searchValue || '').toString());
  useEffect(() => {
    setValue((router.query.searchValue || '').toString());
    const pageParam = router.query?.page;
    if (!pageParam) {
      router.push({ query: { ...router.query, page: 1 } });
    }
  }, [router]);
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitHandler = () => {
    const searchValue = value.trim();
    router.push({ query: { page: 1, searchValue, limit: limit || 1 } });
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
