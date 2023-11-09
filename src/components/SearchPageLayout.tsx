import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import { Outlet } from 'react-router-dom';
import { StorageKeyName } from '../utils/constants';

export const SearchPageLayout = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem(StorageKeyName.search) ?? ''
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
