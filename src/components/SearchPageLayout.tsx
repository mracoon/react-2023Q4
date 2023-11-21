import React, { PropsWithChildren } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { ErrorButton } from './buttons/ErrorButton';
import { Limit } from './Limit/Limit';

export const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2 relative">
        <SearchBar></SearchBar>
        <ErrorButton />
        <Limit />
      </div>

      {children}
    </>
  );
};
