import { FormEvent, useRef, useState } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { CustomInput } from '../components/Form/CustomInput';
import { GenderSelect } from '../components/Form/GenderSelect';
import { CountriesSelect } from '../components/Form/CountriesSelect';
import { createInputsProps } from '../components/Form/inputsProps';
import '../components/Form/form.css';

const pass = 'password1A!';
const formSchema = yup.object({
  name: yup
    .string()
    .required('Field is mandatory')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter must be uppercase'),
  age: yup
    .number()
    .required('Field is mandatory')
    .typeError('The field must be a number')
    .min(0, 'The value cannot be negative'),
  email: yup
    .string()
    .required('Field is mandatory')
    .email('Email has an invalid format')
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Email has an invalid format'
    ),
  password: yup
    .string()
    .required('Field is mandatory')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  confirmPassword: yup
    .string()
    .required('Field is mandatory')
    .matches(new RegExp(pass))
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  tc: yup.boolean().test('tsChaecked', 'You should accept T&C', (tc) => tc),
  fileUpload: yup
    .mixed<FileList>()
    .test('fileRequired', 'Image required', (file) => !!file)
    .test('fileSize', 'Only image up to 2MB are permitted.', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];
      return !file || file.size <= 2_000_000;
    })
    .test('fileType', 'The image must be in png or jpeg format', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];
      const allowedTypes = ['image/jpeg', 'image/png'];
      return allowedTypes.includes(file.type);
    }),
});

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
  const countriesRef = useRef<HTMLSelectElement>(null);
  const [formErrors, updatevalidateErrors] = useState<Record<string, string>>(
    {}
  );
  /*   if (!formRef.current) {
    throw new Error("form doesn't exist");
  } */

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();
    /*  if (!formRef.current) {
      return;
    } */

    try {
      formSchema.validateSync(
        {
          name: nameInputRef.current?.value,
          age: ageInputRef.current?.value,
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
          fileUpload: imageRef.current?.value,
          tc: tcRef.current?.checked,
        },
        { abortEarly: false }
      );
      console.log('ok!');
    } catch (err) {
      if (err instanceof ValidationError) {
        /* console.log(
          error.inner.map((inner) => {
            const x = inner.path || 'name';
            console.log(validateErrors[`${x}`]);

            return `${inner.path}: ${inner.message}`;
          }) 
        );*/
        //console.log(error.inner);
        // if (err instanceof yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        updatevalidateErrors(errors);
        // }
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
              />
              {formErrors[props.name] && (
                <p className="error-message">{formErrors[props.name]}</p>
              )}
            </div>
          );
        })}

        <GenderSelect inputRef={genderRef} />

        <CountriesSelect inputRef={countriesRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledFormPage;
