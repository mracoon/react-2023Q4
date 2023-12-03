import './tiles.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

const TilesList = () => {
  const { dataList } = useAppSelector((state) => state.dataListReducer);
  const [ufStyle, setUFStyle] = useState({ background: 'transparent' });

  useEffect(() => {
    setUFStyle({ background: '#43143b' });
    setTimeout(function () {
      setUFStyle({ background: 'transparent' });
    }, 1000);
  }, []);

  if (dataList.length === 0) {
    return <h3>{`You haven't entered the data yet`}</h3>;
  }

  return (
    <>
      {dataList.map((item, index) => (
        <div
          key={index}
          className="tile flex flex-col items-center justify-between gap-4 w-full"
          style={index === 0 ? ufStyle : { background: 'transparent' }}
        >
          <div className="flex gap-4 items-center flex-wrap justify-center w-full">
            <div className="image-container">
              <img
                src={item.image}
                alt="form image"
                className="block  w-full  h-fit"
              />
            </div>

            <ul className="result-list">
              <li className="result-item">
                <p className="item-title">Name:</p>
                <p className="item-value">{item.name}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Age:</p>
                <p className="item-value">{item.age}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Email:</p>
                <p className="item-value">{item.email}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Password:</p>
                <p className="item-value">{item.password}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Confirm password:</p>
                <p className="item-value">{item.confirmPassword}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Country:</p>
                <p className="item-value">{item.country}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Gender:</p>
                <p className="item-value">{item.gender}</p>
              </li>
              <li className="result-item">
                <p className="item-title">Accept T&C:</p>
                <p className="item-value">{item.tc ? 'true' : 'false'}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default TilesList;
