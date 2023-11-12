import { RequestItem } from '../../types/apiDataTypes';
import { InfoIcons } from '../../utils/infoIcons';

export const DetailsInfo = ({ detailData }: { detailData: RequestItem }) => {
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
    <ul className="flex flex-col items-start pl-2 gap-1 self-start">
      {[
        ['Type', animeType],
        ['Status', status],
        ['Studios', studios],
        ['Duration', duration],
        ['Episodes', episodes],
        ['Score', score],
        ['Rating', rating],
      ].map(([name, value]) => {
        return (
          value && (
            <li className="card-info" key={`details-${name}`}>
              {InfoIcons[name ?? '']} <b>{name}:</b> {value}
            </li>
          )
        );
      })}
    </ul>
  );
};
