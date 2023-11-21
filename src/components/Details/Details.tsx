import dataTemplate from '../../test/dataTemplate';
import { CardImg } from '../Card/CardImg';
import { DetailsInfo } from './DetailsInfo';
import { StorageKeyName } from '../../utils/constants';
import { useRouter } from 'next/router';
import { IData } from '@/types/apiDataTypes';

export const Details = ({ data }: { data: IData }) => {
  const router = useRouter();
  const id = router.query.details;
  const detailsId = id ? id.toString() : null;

  const detailData = data.detailsData ?? dataTemplate;
  const title = detailData.title_english || detailData.title;

  const { query, pathname } = router;

  const { details, ...queryWithoutDetails } = query;
  console.log(details);

  return (
    <>
      {detailsId && (
        <>
          <div className="w-2/4 self-start details card p-4 h-r sticky-0 items-center gap-4 overflow-y-auto">
            <>
              <button
                className="bg-red-800 w-8 h-8 self-end p-1"
                onClick={() => {
                  localStorage.removeItem(StorageKeyName.details);
                  router.push({
                    pathname,
                    query: { ...queryWithoutDetails },
                  });
                }}
              >
                ✖
              </button>
              <h3 className="card-title">{title}</h3>
              <CardImg
                title={title}
                src={detailData?.images.webp.image_url ?? '/'}
              ></CardImg>
              <DetailsInfo detailData={detailData} />
              <div className="flex-center flex-wrap gap-1 w-full">
                {detailData.genres.map((genre) => (
                  <div key={`detail-genres-${genre.mal_id}`} className="genre">
                    {genre.name}
                  </div>
                ))}
              </div>
              <p>{detailData.synopsis}</p>
            </>
          </div>
        </>
      )}
    </>
  );
};
