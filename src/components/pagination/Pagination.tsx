import { useState } from 'react';

export const Pagination = ({
  pageChange,
}: {
  pageChange: (page: number) => void;
}) => {
  const [page, setPage] = useState(1);

  const increment = () => {
    const newPage = page + 1;
    setPage(page + 1);
    pageChange(newPage);
  };

  const decrement = () => {
    const newPage = page - 1;
    setPage(newPage);
    pageChange(newPage);
  };

  return (
    <div className="flex-center gap-4">
      <button onClick={decrement}>prev</button>
      <p style={{ background: 'white' }}>{page}</p>
      <button onClick={increment}>next</button>
    </div>
  );
};
