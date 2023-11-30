import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { CustomInput } from '../components/Form/uncomtrolledForm/CustomInput';
import { GenderSelect } from '../components/Form/GenderSelect';
import { createInputsProps } from '../components/Form/inputsProps';
import '../components/Form/form.css';
import CountriesSelect from '../components/Form/uncomtrolledForm/CountriesSelect';
import { formValidationSchema } from '../utils/createValidationSchema';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { dataListSlice } from '../store/reducers/DataListSlice';

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
      formValidationSchema.validateSync(
        {
          name,
          age,
          email,
          password,
          confirmPassword,
          image,
          tc,
          country,
          gender,
        },
        { abortEarly: false }
      );

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
        dispatch(setLastName(name));
        dispatch(setLastAge(age));
        dispatch(setLastEmail(email));
        dispatch(setLastPassword(password));
        dispatch(setLastConfirmPassword(confirmPassword));
        dispatch(setLastGender(gender));
        dispatch(setLastTC(tc));
        dispatch(setLastCountry(country));
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
        dispatch(setLastImage(result));
        dispatch(addNewSubmit());
      }
      navigate('/', { state: { from: 'uncontrolled from' } });
    };
  };

  const inputsProps = createInputsProps({
    name: nameInputRef,
    age: ageInputRef,
    email: emailInputRef,
    password: passwordInputRef,
    confirmPassword: confirmPasswordRef,
    image: imageRef,
    tc: tcRef,
  });
  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={submitFormHandler} ref={formRef} autoComplete="on">
        {inputsProps.map((props) => {
          return (
            <div
              key={`uctrl-input-${props.name}`}
              className="flex flex-col items-start justify-start w-full form-item"
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
        <CountriesSelect
          inputRef={countriesRef}
          errorMessage={formErrors['country']}
        />
        <GenderSelect inputRef={genderRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledFormPage;
