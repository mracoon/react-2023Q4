import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { CustomInput } from '../components/Form/CustomInput';
import { GenderSelect } from '../components/Form/GenderSelect';
import { createInputsProps } from '../components/Form/inputsProps';
import '../components/Form/form.css';
import CountriesSelect from '../components/Form/CountriesSelect';
import { createValidationSchema } from '../utils/createValidationSchema';

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

  const [formErrors, updatevalidateErrors] = useState<Record<string, string>>(
    {}
  );

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    try {
      createValidationSchema(
        passwordInputRef.current?.value || ''
      ).validateSync(
        {
          name: nameInputRef.current?.value,
          age: ageInputRef.current?.value,
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
          fileUpload: imageRef.current?.files,
          tc: tcRef.current?.checked,
          country: countriesRef.current?.value.trim(),
        },
        { abortEarly: false }
      );
      console.log('ok!');
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
            countriesRef={countriesRef}
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
