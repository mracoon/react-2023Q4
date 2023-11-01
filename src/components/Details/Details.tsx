import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Nullable, RequestItem } from '../../types/apiDataTypes';
import { useEffect, useState } from 'react';
import dataTemplate from '../../test/dataTemplate';
import { CardImg } from '../Card/CardImg';
import { RiMovie2Fill } from 'react-icons/ri';
import { BsFillStarFill } from 'react-icons/bs';
import { GiFilmProjector } from 'react-icons/gi';
import { Md18UpRating, MdVideoLibrary } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';
import { PiTelevisionSimpleDuotone } from 'react-icons/pi';

export const Details = () => {
  const { detailCardId, cardClickHandler } = useOutletContext<{
    detailCardId: Nullable<number>;
    cardClickHandler: (id: Nullable<number>) => void;
  }>();
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
  const studios = detailData.studios.map((studio) => studio.name).join(', ');
  const {
    score,
    duration,
    rating,
    status,
    type: animeType,
    episodes,
  } = detailData;
  return (
    <>
      {detailCardId && (
        <div className="w-2/4 self-start details card p-4 h-r sticky-0 items-center gap-4">
          {isLoading && <p className="loader"></p>}
          {!isLoading && (
            <>
              <button
                className="bg-red-800 w-8 h-8 self-end p-1"
                onClick={() => {
                  cardClickHandler(null);
                }}
              >
                &#10006;
              </button>
              <h3 className="card-title">{title}</h3>
              <CardImg
                title={title}
                src={detailData.images.webp.image_url}
              ></CardImg>
              <ul className="flex flex-col items-start pl-2 gap-1 self-start">
                {animeType && (
                  <li className="card-info">
                    <PiTelevisionSimpleDuotone className="icon" /> <b>Type:</b>{' '}
                    {animeType}
                  </li>
                )}
                {status && (
                  <li className="card-info">
                    <RiMovie2Fill className="icon" /> <b>Status:</b> {status}
                  </li>
                )}
                {studios && (
                  <li className="card-info">
                    <GiFilmProjector className="icon" />
                    <b>Studios:</b> {studios}
                  </li>
                )}
                {duration && (
                  <li className="card-info">
                    <BiTimeFive className="icon" /> <b>Duration:</b> {duration}
                  </li>
                )}
                {episodes && (
                  <li className="card-info">
                    <MdVideoLibrary className="icon" /> <b>Episodes</b>{' '}
                    {episodes}
                  </li>
                )}
                {score && (
                  <li className="card-info">
                    <BsFillStarFill className="icon" />
                    <b>Score:</b> {score}
                  </li>
                )}
                {rating && (
                  <li className="card-info">
                    <Md18UpRating className="icon" /> <b>Raiting:</b> {rating}
                  </li>
                )}
              </ul>
              <div className="flex-center flex-wrap gap-1 w-full">
                {detailData.genres.map((genre) => (
                  <div key={`detail-genres-${genre.mal_id}`} className="genre">
                    {genre.name}
                  </div>
                ))}
              </div>
              <p>{detailData.synopsis ?? 'no description'}</p>
            </>
          )}
        </div>
      )}
    </>
  );
};
