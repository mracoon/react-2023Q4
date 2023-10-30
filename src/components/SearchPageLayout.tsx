import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorBtn } from './buttons/ErrorBtn';
import { Outlet } from 'react-router-dom';

export const SearchPageLayout = () => {
  const [searchVal, setSearchVal] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );

  const valChange = (newVal: string) => {
    setSearchVal(newVal);
  };

  type ContextType = { searchVal: string };
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar valChange={valChange}></SearchBar>
        <ErrorBtn></ErrorBtn>
      </div>
      <Outlet context={{ searchVal } satisfies ContextType} />
    </>
  );
};
