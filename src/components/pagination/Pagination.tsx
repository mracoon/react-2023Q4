import { useSearchParams } from 'react-router-dom';

export const Pagination = ({
  pageChange,
}: {
  pageChange: (page: number) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? '1');

  const increment = () => {
    const newPage = page + 1;
    pageChange(newPage);
    setSearchParams({ page: `${newPage}` });
  };

  const decrement = () => {
    const newPage = page - 1;
    pageChange(newPage);
    setSearchParams({ page: `${newPage}` });
  };

  return (
    <div className="flex-center gap-4">
      <button onClick={decrement}>prev</button>
      <p style={{ background: 'white' }}>{page}</p>
      <button onClick={increment}>next</button>
    </div>
  );
};
