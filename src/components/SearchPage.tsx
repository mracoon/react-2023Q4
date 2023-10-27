import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ResultsContainer from './ResultsContainer';
import { ErrorBtn } from './buttons/ErrorBtn';
import { Pagination } from './pagination/Pagination';

const SearchPage = () => {
  const [searchVal, setSearchVal] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );
  const [curPage, setCurPage] = useState(1);
  const valChange = (newVal: string) => {
    setSearchVal(newVal);
  };

  const pageChange = (newPage: number) => {
    setCurPage(newPage);
  };
  return (
    <div className="search-page-content flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar valChange={valChange}></SearchBar>
        <ErrorBtn></ErrorBtn>
      </div>
      <ResultsContainer searchVal={searchVal} page={curPage}></ResultsContainer>
      <Pagination pageChange={pageChange}></Pagination>
    </div>
  );
};

export default SearchPage;
