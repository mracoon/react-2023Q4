import { useSearchParams } from 'react-router-dom';
import { RequestPagination } from '../../types/apiDataTypes';
import { StorageKeyName } from '../../utils/constants';

interface IPaginationInfoProps {
  paginationInfo: RequestPagination;
}

export const Pagination = ({ paginationInfo }: IPaginationInfoProps) => {
  const page = paginationInfo.current_page;
  const [, setSearchParams] = useSearchParams({
    page: `${paginationInfo.current_page}`,
  });

  const { last_visible_page: lastPage, has_next_page: hasNextPage } =
    paginationInfo;

  const updatePage = (newPage: number) => {
    setSearchParams({ page: `${newPage}` });
    localStorage.setItem(StorageKeyName.pagination, `${newPage}`);
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
      <button onClick={decrement} disabled={page === 1 || undefined}>
        prev
      </button>
      <p style={{ background: 'white' }}>{page}</p>
      <button onClick={increment} disabled={!hasNextPage || undefined}>
        next
      </button>
    </div>
  );
};
