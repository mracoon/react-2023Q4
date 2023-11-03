import { useSearchParams } from 'react-router-dom';
import { ReqPagination } from '../../types/apiDataTypes';
export const Pagination = ({ pagInfo }: { pagInfo: ReqPagination }) => {
  const page = pagInfo.current_page;
  const [, setSearchParams] = useSearchParams({
    page: `${pagInfo.current_page}`,
  });

  const { last_visible_page: lastPage, has_next_page: hasNextPage } = pagInfo;

  const updatePage = (newPage: number) => {
    setSearchParams({ page: `${newPage}` });
    localStorage.setItem('mracoon-pag-page', `${newPage}`);
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
