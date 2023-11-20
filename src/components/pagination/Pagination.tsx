import React from 'react';
import { RequestPagination } from '../../types/apiDataTypes';
import { StorageKeyName } from '../../utils/constants';
import { useRouter } from 'next/router';

interface IPaginationInfoProps {
  paginationInfo: RequestPagination;
}

export const Pagination = ({ paginationInfo }: IPaginationInfoProps) => {
  const router = useRouter();
  const { query } = router;
  const page = +(query?.page || 1);
  const {
    last_visible_page: lastPage,
    has_next_page: hasNextPage,
    current_page: currentPage,
  } = paginationInfo;

  const updatePage = (newPage: number) => {
    localStorage.setItem(StorageKeyName.pagination, `${newPage}`);
    console.log(query, newPage);
    router.push({ query: { ...query, page: newPage } });
  };

  const increment = () => {
    const newPage = Math.min(page + 1, lastPage);
    updatePage(newPage);
  };

  const decrement = () => {
    const newPage = Math.max(page - 1, 0);
    updatePage(newPage);
  };

  return (
    <div className="flex-center gap-4">
      <button onClick={decrement} disabled={currentPage === 1 || undefined}>
        prev
      </button>
      <p style={{ background: 'white' }}>{page}</p>
      <button onClick={increment} disabled={!hasNextPage || undefined}>
        next
      </button>
    </div>
  );
};
