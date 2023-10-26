import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ResultsContainer from './ResultsContainer';
import { ErrorBtn } from './buttons/ErrorBtn';

const SearchPage = () => {
  const [searchVal, setSearchVal] = useState(
    localStorage.getItem('mracoon-search-query') ?? ''
  );

  const valChange = (newVal: string) => {
    setSearchVal(newVal);
  };

  return (
    <div className="search-page-content flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar valChange={valChange}></SearchBar>
        <ErrorBtn></ErrorBtn>
      </div>
      <ResultsContainer searchVal={searchVal}></ResultsContainer>
    </div>
  );
};

export default SearchPage;
