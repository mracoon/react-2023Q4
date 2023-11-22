import dataTemplate from '../../test/dataTemplate';
import { CardImg } from '../Card/CardImg';
import { DetailsInfo } from './DetailsInfo';
import { useRouter } from 'next/router';
import { IData } from '@/types/apiDataTypes';

export const Details = ({ data }: { data: IData }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { details: id, ...queryWithoutDetails } = query;

  const detailsId = id ? id.toString() : null;

  const detailData = data.detailsData.data ?? dataTemplate;

  const title = detailData.title_english || detailData.title;

  return (
    <>
      {detailsId && (
        <>
          <div className="w-2/4 self-start details card p-4 h-r sticky-0 items-center gap-4 overflow-y-auto">
            <>
              <button
                className="bg-red-800 w-8 h-8 self-end p-1"
                onClick={() => {
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
