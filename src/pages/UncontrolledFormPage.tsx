import { FormEvent, useRef } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { CustomInput } from '../components/Form/CustomInput';
import { GenderSelect } from '../components/Form/GenderSelect';
import { CountriesSelect } from '../components/Form/CountriesSelect';
import { createInputsProps } from '../components/Form/inputsProps';
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

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    try {
      formSchema.validateSync(
        {
          name: nameInputRef.current?.value,
          age: ageInputRef.current?.value,
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
          fileUpload: imageRef.current?.value,
        },
        { abortEarly: false }
      );
      console.log('ok!');
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(
          error.inner.map((inner) => {
            return `${inner.path}: ${inner.message}`;
          })
        );
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
            <CustomInput
              key={`input-${props.name}`}
              lableText={props.lableText}
              inputType={props.inputType}
              name={props.name}
              inputId={props.inputId}
              autocomplete={props.autocomplete}
              inputRef={props.inputRef}
            />
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
