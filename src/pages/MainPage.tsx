import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';

const MainPage = () => {
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
  } = useAppSelector((state) => state.uncontrolledFormReducer);
  const {
    image: rhfImage,
    name: rhfName,
    age: rhfAge,
    email: rhfEmail,
    password: rhfPassword,
    confirmPassword: rhfConfirmPassword,
    tc: rhfTC,
    country: rhfCountry,
    gender: rhfGender,
  } = useAppSelector((state) => state.RHFReducer);
  console.log('main page');
  const location = useLocation();
  // const state: { from: string } = location.state;
  console.log(location.state);
  console.log(image);
  const [ufStyle, setUFStyle] = useState({ background: 'transparent' });
  const [rhfStyle, setRHFStyle] = useState({ background: 'transparent' });
  useEffect(() => {
    if (location.state) {
      if (location.state.from === 'rhf') {
        setRHFStyle({ background: 'red' });
        setTimeout(function () {
          setRHFStyle({ background: 'transparent' });
        }, 3000);
      } else {
        setUFStyle({ background: 'red' });
        setTimeout(function () {
          setUFStyle({ background: 'transparent' });
        }, 3000);
      }
    }
  }, [location.state]);

  return (
    <>
      <h1>MainPage</h1>

      <div className="border border-indigo-600 border-2" style={ufStyle}>
        <h1>Uncontrolled form Data:</h1>

        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>

        <p>Confirm password: {confirmPassword}</p>
        <p>Accept T&C:: {tc}</p>

        <p>Country: {country}</p>
        <p>gender: {gender}</p>
        <img
          src={image}
          alt="uncontrolled form image"
          className="block max-w-md w-full max-h-md h-fit"
        />
      </div>

      <div className="border border-indigo-600 border-2" style={rhfStyle}>
        <h1>React Hook Form Data:</h1>

        <p>Name: {rhfName}</p>
        <p>Age: {rhfAge}</p>
        <p>Email: {rhfEmail}</p>
        <p>Password: {rhfPassword}</p>

        <p>Confirm password: {rhfConfirmPassword}</p>
        <p>Accept T&C:: {rhfTC}</p>

        <p>Country: {rhfCountry}</p>
        <p>gender: {rhfGender}</p>
        <img
          src={rhfImage}
          alt="react hook form image"
          className="block max-w-md w-full max-h-md h-fit"
        />
      </div>
    </>
  );
};

export default MainPage;
