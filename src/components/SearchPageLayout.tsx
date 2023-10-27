import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorBtn } from './buttons/ErrorBtn';
import { Pagination } from './pagination/Pagination';
import { Outlet } from 'react-router-dom';

export const SearchPageLayout = () => {
  const [searchVal, setSearchVal] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );

  const [page, setCurPage] = useState(1);

  const valChange = (newVal: string) => {
    setSearchVal(newVal);
  };

  const pageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  type ContextType = { searchVal: string; page: number };
  return (
    <div className="search-page-content flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar valChange={valChange}></SearchBar>
        <ErrorBtn></ErrorBtn>
      </div>
      <Outlet context={{ searchVal, page } satisfies ContextType}></Outlet>
      <Pagination pageChange={pageChange}></Pagination>
    </div>
  );
};
