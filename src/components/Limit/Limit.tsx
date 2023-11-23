import { useRouter } from 'next/router';

export const Limit = () => {
  const router = useRouter();
  const { query } = router;

  const changeLumitValHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    delete query.details;
    router.push({ query: { ...query, limit: +event.target.value, page: 1 } });
  };

  return (
    <div className="limit-container flex-center gap-4">
      <label>
        Limit:{' '}
        <select
          name="limit"
          onChange={changeLumitValHandler}
          value={+(query.limit || 1)}
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
