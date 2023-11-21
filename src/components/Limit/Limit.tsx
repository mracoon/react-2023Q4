import React, { useEffect, useState } from 'react';
import { StorageKeyName } from '../../utils/constants';
import { useRouter } from 'next/router';

export const Limit = () => {
  const router = useRouter();
  const { query } = router;
  const [limitValue, setLimitValue] = useState(+(query.limit || 1));

  useEffect(() => {
    setLimitValue(+(router.query.limit || 1));
  }, [router]);
  const changeLumitValHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLimitValue(+event.target.value);
    delete query.details;
    router.push({ query: { ...query, limit: +event.target.value, page: 1 } });

    localStorage.setItem(StorageKeyName.limit, event.target.value);
    localStorage.setItem(StorageKeyName.pagination, '1');
  };

  return (
    <div className="limit-container flex-center gap-4">
      <label>
        Limit:{' '}
        <select
          name="limit"
          onChange={changeLumitValHandler}
          value={limitValue ?? 1}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </label>
    </div>
  );
};
