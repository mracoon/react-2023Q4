import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import { Outlet } from 'react-router-dom';

export const SearchPageLayout = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar></SearchBar>
        <ErrorButton />
      </div>
      <Outlet></Outlet>
    </>
  );
};
