import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import dataTemplate from '../../test/dataTemplate';
import { CardImg } from '../Card/CardImg';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { DetailsInfo } from './DetailsInfo';
import { IDetailsProps } from './DetailsTypes';
import { useAppSelector } from '../../hooks/redux';
import { animeApi } from '../../services/AnimeService';
import { skipToken } from '@reduxjs/toolkit/query/react';

export const Details = ({ detailCardId, cardClickHandler }: IDetailsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (detailCardId) {
      searchParams.set('detail', `${detailCardId}`);
    } else {
      searchParams.delete('detail');
    }
    setSearchParams(searchParams);
  }, [detailCardId, searchParams, setSearchParams]);

  const { isDetailsLoading } = useAppSelector((state) => state.loadingReducer);

  const { data, isError } = animeApi.useGetDetailsQuery(
    detailCardId ?? skipToken
  );

  const detailData = data?.data ?? dataTemplate;

  const title = detailData.title_english || detailData.title;
  return (
    <>
      {detailCardId && (
        <div className="w-2/4 self-start details card p-4 h-r sticky-0 items-center gap-4 overflow-y-auto">
          {isDetailsLoading && <p className="loader" data-testid="loader"></p>}
          {isError && <ApiErrorMessage />}
          {!isDetailsLoading && !isError && (
            <>
              <button
                className="bg-red-800 w-8 h-8 self-end p-1"
                onClick={() => {
                  cardClickHandler(null);
                }}
              >
                ✖
              </button>
              <h3 className="card-title">{title}</h3>
              <CardImg
                title={title}
                src={detailData?.images.webp.image_url}
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
          )}
        </div>
      )}
    </>
  );
};
