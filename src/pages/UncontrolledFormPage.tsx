import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { CustomInput } from '../components/Form/CustomInput';
import { GenderSelect } from '../components/Form/GenderSelect';
import { createInputsProps } from '../components/Form/inputsProps';
import '../components/Form/form.css';
import CountriesSelect from '../components/Form/CountriesSelect';
import { createValidationSchema } from '../utils/createValidationSchema';
import { useNavigate } from 'react-router-dom';
import { uncontrolledFormSlice } from '../store/reducers/UncontrolledFormSlice';
import { useAppDispatch } from '../hooks/redux';

const UncontrolledFormPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tcRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countriesRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [formErrors, updatevalidateErrors] = useState<Record<string, string>>(
    {}
  );
  const {
    setUncontrolledImage,
    setUncontrolledAge,
    setUncontrolledConfirmPassword,
    setUncontrolledCountry,
    setUncontrolledEmail,
    setUncontrolledGender,
    setUncontrolledName,
    setUncontrolledTC,
    setUncontrolledPassword,
  } = uncontrolledFormSlice.actions;
  // const { image } = useAppSelector((state) => state.uncontrolledFormReducer);
  const dispatch = useAppDispatch();
  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const name = nameInputRef.current?.value;
    const age = ageInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const gender = genderRef.current?.value;
    const tc = tcRef.current?.checked;
    const image = imageRef.current?.files;
    const country = countriesRef.current?.value;
    try {
      createValidationSchema(
        passwordInputRef.current?.value || ''
      ).validateSync(
        {
          name,
          age,
          email,
          password,
          confirmPassword,
          image,
          tc,
          country,
        },
        { abortEarly: false }
      );
      console.log('ok!');
      if (
        name &&
        age &&
        email &&
        password &&
        confirmPassword &&
        gender &&
        tc &&
        image &&
        country
      ) {
        dispatch(setUncontrolledName(name));
        dispatch(setUncontrolledAge(age));
        dispatch(setUncontrolledEmail(email));
        dispatch(setUncontrolledPassword(password));
        dispatch(setUncontrolledConfirmPassword(confirmPassword));
        dispatch(setUncontrolledGender(gender));
        dispatch(setUncontrolledTC(tc));
        dispatch(setUncontrolledCountry(country));

        imageToBase64(image[0]);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });

        updatevalidateErrors(errors);
      }
    }
  };

  const imageToBase64 = async (image: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const result = reader.result;

      if (typeof result === 'string') {
        dispatch(setUncontrolledImage(result));
      }
      navigate('/', { state: { from: 'uncontrolled from' } });
    };
  };

  const inputsProps = createInputsProps({
    nameInputRef,
    ageInputRef,
    emailInputRef,
    passwordInputRef,
    confirmPasswordRef,
    imageRef,
    tcRef,
  });
  return (
    <>
      <h1>Uncontrolled Form Page</h1>
      <form
        onSubmit={submitFormHandler}
        ref={formRef}
        className="flex flex-col gap-4 items-start"
        autoComplete="on"
      >
        {inputsProps.map((props) => {
          return (
            <div
              key={`uctrl-input-${props.name}`}
              className="flex flex-col items-start justify-start"
            >
              <CustomInput
                lableText={props.lableText}
                inputType={props.inputType}
                name={props.name}
                inputId={props.inputId}
                autocomplete={props.autocomplete}
                inputRef={props.inputRef}
                errorMessage={formErrors[props.name]}
              />
            </div>
          );
        })}
        <div className="flex flex-col items-start justify-start">
          <CountriesSelect
            inputRef={countriesRef}
            errorMessage={formErrors['country']}
          />
        </div>
        <GenderSelect inputRef={genderRef} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledFormPage;
