import { useLocation } from 'react-router-dom';
import './tiles.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

const Tile = ({ isRHFTile }: { isRHFTile: boolean }) => {
  const {
    image,
    name,
    age,
    email,
    password,
    confirmPassword,
    tc,
    country,
    gender,
  } = useAppSelector((state) =>
    isRHFTile ? state.RHFReducer : state.uncontrolledFormReducer
  );

  const location = useLocation();

  const [ufStyle, setUFStyle] = useState({ background: 'transparent' });

  useEffect(() => {
    if (location.state) {
      if (
        (location.state.from === 'rhf' && isRHFTile) ||
        (location.state.from === 'uncontrolled from' && !isRHFTile)
      ) {
        setUFStyle({ background: '#43143b' });
        setTimeout(function () {
          setUFStyle({ background: 'transparent' });
        }, 1000);
      }
    }
  }, [location.state, isRHFTile]);

  return (
    <>
      <div
        className="tile flex flex-col items-center justify-between gap-4 w-full"
        style={ufStyle}
      >
        <h2 className="text-4xl">
          {isRHFTile ? 'React Hook Form Data' : 'Uncontrolled form Data'}
        </h2>
        <div className="flex gap-4 items-center flex-wrap justify-center w-full">
          <div className="image-container">
            <img
              src={image}
              alt="form image"
              className="block  w-full  h-fit"
            />
          </div>

          <ul className="result-list">
            <li className="result-item">
              <p className="item-title">Name:</p>
              <p className="item-value">{name}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Age:</p>
              <p className="item-value">{age}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Email:</p>
              <p className="item-value">{email}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Password:</p>
              <p className="item-value">{password}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Confirm password:</p>
              <p className="item-value">{confirmPassword}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Country:</p>
              <p className="item-value">{country}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Gender:</p>
              <p className="item-value">{gender}</p>
            </li>
            <li className="result-item">
              <p className="item-title">Accept T&C:</p>
              <p className="item-value">{tc ? 'true' : 'false'}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tile;
