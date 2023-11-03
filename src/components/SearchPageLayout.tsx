import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import { Outlet } from 'react-router-dom';

export const SearchPageLayout = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );

  const valueChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  type ContextType = { searchValue: string };
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar valueChange={valueChange}></SearchBar>
        <ErrorButton />
      </div>
      <Outlet context={{ searchValue } satisfies ContextType} />
    </>
  );
};
