import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidationSchema } from '../utils/createValidationSchema';
import { countries } from '../utils/countriesList';
import { useAppDispatch } from '../hooks/redux';
import { RHFSlice } from '../store/reducers/RHFSlice';
import { useNavigate } from 'react-router-dom';
//import RHFSlice from '../store/reducers/RHFSlice';
type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tc?: boolean;
  image: FileList;
  country: string;
};

const ReactHookFormPage = () => {
  const {
    setRHFAge,
    setRHFConfirmPassword,
    setRHFCountry,
    setRHFEmail,
    setRHFGender,
    setRHFImage,
    setRHFTC,
    setRHFName,
    setRHFpassword,
  } = RHFSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(formValidationSchema),
  });
  const onSubmit = handleSubmit((data) => {
    dispatch(setRHFAge(`${data.age}`));
    dispatch(setRHFConfirmPassword(data.confirmPassword));
    dispatch(setRHFCountry(data.country));

    dispatch(setRHFEmail(data.email));
    dispatch(setRHFCountry(data.country));
    dispatch(setRHFGender(data.gender));
    dispatch(setRHFCountry(data.country));
    dispatch(setRHFTC(!!data.tc));
    dispatch(setRHFpassword(data.password));
    dispatch(setRHFName(data.name));

    imageToBase64(data.image[0]);
  });

  const imageToBase64 = async (image: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        dispatch(setRHFImage(result));
      }
      navigate('/', { state: { from: 'rhf' } });
    };
  };

  return (
    <>
      <h1>React Hook Form Page</h1>
      <form onSubmit={onSubmit}>
        {/*-------------------------------------------------------------------*/}

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="name">Name:</label>
            <input {...register('name')} id={'name'} />
          </div>
          <p className="error-message">{errors.name?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="age">Age:</label>
            <input {...register('age')} id={'age'} type="number" />
          </div>
          <p className="error-message">{errors.age?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="email">Email:</label>
            <input {...register('email')} id={'email'} />
          </div>
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="password">Password:</label>
            <input {...register('password')} id={'password'} type="password" />
          </div>
          <p className="error-message">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input
              {...register('confirmPassword')}
              id={'confirmPassword'}
              type="password"
            />
          </div>
          <p className="error-message">{errors.confirmPassword?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="image">Upload image:</label>
            <input {...register('image')} id={'image'} type="file" />
          </div>
          <p className="error-message">{errors.image?.message}</p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <div>
            <label htmlFor="tc">Accept T&C:</label>
            <input {...register('tc')} id={'tc'} type="checkbox" />
          </div>
          <p className="error-message">{errors.tc?.message}</p>
        </div>
        {/*-------------------------------------------------------------------*/}

        <div className="flex flex-col items-start justify-start">
          <div className="relative">
            <label htmlFor="countries">Countries:</label>
            <input
              {...register('country')}
              id="countries"
              placeholder="Choose country..."
              list="countries-list"
            />

            <datalist id="countries-list">
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </datalist>
          </div>
          <p className="error-message">{errors.country?.message}</p>
        </div>

        {/*-------------------------------------------------------------------*/}
        <div>
          <label htmlFor="gender">Gender:</label>
          <select {...register('gender')} id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};
export default ReactHookFormPage;
