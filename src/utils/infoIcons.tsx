import { RiMovie2Fill } from 'react-icons/ri';
import { BsFillStarFill } from 'react-icons/bs';
import { GiFilmProjector } from 'react-icons/gi';
import { Md18UpRating, MdVideoLibrary } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';
import { PiTelevisionSimpleDuotone } from 'react-icons/pi';

export const InfoIcons: Record<string, JSX.Element> = {
  Type: <PiTelevisionSimpleDuotone className="icon" />,
  Status: <RiMovie2Fill className="icon" />,
  Studios: <GiFilmProjector className="icon" />,
  Duration: <BiTimeFive className="icon" />,
  Episodes: <MdVideoLibrary className="icon" />,
  Score: <BsFillStarFill className="icon" />,
  Rating: <Md18UpRating className="icon" />,
};
