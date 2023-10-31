import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Nullable, RequestItem } from '../types/apiDataTypes';
import { useEffect, useState } from 'react';
import dataTemplate from '../test/dataTemplate';
import { CardImg } from './Card/CardImg';

export const Details = () => {
  const detailCardId = useOutletContext<Nullable<number>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState<RequestItem>(dataTemplate);
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
    const ctrl = new AbortController();
    setDetailData(dataTemplate);
    if (detailCardId) {
      setIsLoading(true);
      fetch(`https://api.jikan.moe/v4/anime/${detailCardId}`, {
        signal: ctrl.signal,
      })
        .then((res) => {
          return res.json();
        })
        .then((data: { data: RequestItem }) => {
          setDetailData(data.data);
          setIsLoading(false);
          console.log(data);
        })
        .catch((err: Error) => {
          console.log(err);
          //const isAbortErr = err.name === 'AbortError';
          setDetailData(dataTemplate);
          setIsLoading(false);
        });
    }
    return () => {
      ctrl.abort();
    };
  }, [detailCardId]);

  const title = detailData.title_english || detailData.title;
  return (
    <>
      {detailCardId && (
        <div className="w-2/4 self-start details">
          {isLoading && <p className="loader"></p>}
          {!isLoading && (
            <>
              <h3>{title}</h3>
              <CardImg
                title={title}
                src={detailData.images.webp.image_url}
              ></CardImg>
              <p>Type: {detailData.type}</p>
              <p>Status: {detailData.status}</p>
              <p>
                Genres:
                {detailData.genres.map((genre) => (
                  <div key={`detail-genres-${genre.mal_id}`} className="genre">
                    {genre.name}
                  </div>
                ))}
              </p>
              <p>
                Studios:
                {detailData.studios.map((studio) => (
                  <div key={`detail-studios-${studio.mal_id}`}>
                    {studio.name}
                  </div>
                ))}
              </p>
              <p>Duration: {detailData.duration}</p>
              <p>{detailData.synopsis ?? 'no description'}</p>
            </>
          )}
        </div>
      )}
    </>
  );
};
