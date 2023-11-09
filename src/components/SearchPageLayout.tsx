import { useState, createContext } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import { Outlet } from 'react-router-dom';
import { StorageKeyName } from '../utils/constants';

interface ContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchValueContext = createContext<ContextType>({
  searchValue: '',
  setSearchValue: () => {},
});

export const SearchPageLayout = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem(StorageKeyName.search) ?? ''
  );

  return (
    <SearchValueContext.Provider value={{ searchValue, setSearchValue }}>
      <>
        <div className="w-full flex justify-between items-center gap-2 relative">
          <SearchBar></SearchBar>
          <ErrorButton />
        </div>
        <Outlet></Outlet>
      </>
    </SearchValueContext.Provider>
  );
};
