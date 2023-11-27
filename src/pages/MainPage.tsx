import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

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
  console.log('main page');
  const location = useLocation();
  // const state: { from: string } = location.state;
  console.log(location.state);
  console.log(image);

  return (
    <>
      <h1>MainPage</h1>

      <div>
        <h3>Uncontrolled form Data:</h3>

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
    </>
  );
};

export default MainPage;
