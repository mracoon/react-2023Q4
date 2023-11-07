import { useSearchParams } from 'react-router-dom';
import { RequestItem } from '../../types/apiDataTypes';
import { useEffect, useState } from 'react';
import dataTemplate from '../../test/dataTemplate';
import { CardImg } from '../Card/CardImg';
import { ApiErrorMessage } from '../Error/ApiErrorMessage';
import { IApiError } from '../ResultsContainer/ResultsContainer';
import { getApiData } from '../../utils/API';
import { DetailsInfo } from './DetailsInfo';
import { IDetailsProps } from './DetailsTypes';

export const Details = ({ detailCardId, cardClickHandler }: IDetailsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState<RequestItem>(dataTemplate);
  const [apiError, setApiError] = useState<IApiError>({ hasApiError: false });

  useEffect(() => {
    if (detailCardId) {
      searchParams.set('detail', `${detailCardId}`);
    } else {
      searchParams.delete('detail');
    }
    setSearchParams(searchParams);
  }, [detailCardId, searchParams, setSearchParams]);

  useEffect(() => {
    setIsLoading(false);
    setApiError({ hasApiError: false });
    const controller = new AbortController();
    setDetailData(dataTemplate);
    if (detailCardId) {
      setIsLoading(true);
      getApiData<{ data: RequestItem }>(
        controller,
        `/${detailCardId}`,
        setIsLoading,
        setApiError
      )
        .then((data) => {
          setDetailData(data?.data ?? dataTemplate);
          setIsLoading(false);
        })
        .catch(() => {
          setDetailData(dataTemplate);
        });
    }
    return () => {
      controller.abort();
    };
  }, [detailCardId]);

  const title = detailData.title_english || detailData.title;
  return (
    <>
      {detailCardId && (
        <div className="w-2/4 self-start details card p-4 h-r sticky-0 items-center gap-4 overflow-y-auto">
          {isLoading && <p className="loader" data-testid="loader"></p>}
          {apiError.hasApiError && (
            <ApiErrorMessage message={apiError.errorMessage ?? ''} />
          )}
          {!isLoading && !apiError.hasApiError && (
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
                src={detailData.images.webp.image_url}
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
