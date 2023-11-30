import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidationSchema } from '../utils/createValidationSchema';
import { useAppDispatch } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { inputProps } from '../components/Form/inputsProps';
import RHFCountriesSelect from '../components/Form/RHF/RHFCountriesSelect';
import { MyFormData } from '../types/types';
import { RHFCustomInput } from '../components/Form/RHF/RHFCustomInput';
import { dataListSlice } from '../store/reducers/DataListSlice';

const ReactHookFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    addNewSubmit,
    setLastAge,
    setLastConfirmPassword,
    setLastEmail,
    setLastGender,
    setLastImage,
    setLastName,
    setLastPassword,
    setLastTC,
    setLastCountry,
  } = dataListSlice.actions;

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<MyFormData>({
    mode: 'onChange',
    resolver: yupResolver(formValidationSchema),
  });
  const onSubmit = handleSubmit((data) => {
    dispatch(setLastName(data.name));
    dispatch(setLastAge(`${data.age}`));
    dispatch(setLastEmail(data.email));
    dispatch(setLastPassword(data.password));
    dispatch(setLastConfirmPassword(data.confirmPassword));
    dispatch(setLastGender(data.gender));
    dispatch(setLastTC(!!data.tc));
    dispatch(setLastCountry(data.country));
    imageToBase64(data.image[0]);
  });

  const imageToBase64 = async (image: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        dispatch(setLastImage(result));
        dispatch(addNewSubmit());
      }
      navigate('/', { state: { from: 'rhf' } });
    };
  };

  return (
    <>
      <h1>React Hook Form</h1>
      <form onSubmit={onSubmit}>
        {inputProps.map((props) => {
          return (
            <div
              key={`rhf-input-${props.name}`}
              className="flex flex-col items-start justify-start w-full form-item"
            >
              <RHFCustomInput
                props={props}
                errorMessage={errors[props.name]?.message}
                register={register}
              ></RHFCustomInput>
            </div>
          );
        })}

        <RHFCountriesSelect
          register={register}
          errorMessage={errors.country?.message}
        />

        <div className="flex flex-col items-start justify-start w-full form-item">
          <div className="flex flex-col w-full items-start input-container">
            <label htmlFor="gender">Gender:</label>
            <select {...register('gender')} id="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};
export default ReactHookFormPage;
