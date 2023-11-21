import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import ResultsContainer from './ResultsContainer/ResultsContainer';
import { Limit } from './Limit/Limit';
import { IData } from '@/types/apiDataTypes';
//import { Outlet } from 'react-router-dom';

export const SearchPageLayout = ({ data }: { data: IData }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar></SearchBar>
        <ErrorButton />
        <Limit />
      </div>

      {/*  <Outlet></Outlet> */}
      <ResultsContainer data={data} />
    </>
  );
};
