import { ICustomInputProps } from './CustomInput';
interface iRefs {
  nameInputRef: React.RefObject<HTMLInputElement>;
  ageInputRef: React.RefObject<HTMLInputElement>;
  emailInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  imageRef: React.RefObject<HTMLInputElement>;
  tcRef: React.RefObject<HTMLInputElement>;
}

export const createInputsProps = (refs: iRefs): ICustomInputProps[] => [
  {
    lableText: 'Name',
    inputType: 'text',
    name: 'name',
    inputId: 'name',
    inputRef: refs.nameInputRef,
  },
  {
    lableText: 'Age',
    inputType: 'number',
    name: 'age',
    inputId: 'age',
    inputRef: refs.ageInputRef,
  },
  {
    lableText: 'Email',
    inputType: 'email',
    name: 'email',
    inputId: 'email',
    inputRef: refs.emailInputRef,
    autocomplete: 'email',
  },
  {
    lableText: 'Password',
    inputType: 'password',
    name: 'password',
    inputId: 'password',
    inputRef: refs.passwordInputRef,
    autocomplete: 'new-password',
  },
  {
    lableText: 'Confirm password',
    inputType: 'password',
    name: 'confirmPassword',
    inputId: 'confirmPassword',
    inputRef: refs.confirmPasswordRef,
    autocomplete: 'new-password',
  },
  {
    lableText: 'Upload image',
    inputType: 'file',
    name: 'fileUpload',
    inputId: 'fileUpload',
    inputRef: refs.imageRef,
  },
  {
    lableText: 'Accept T&C',
    inputType: 'checkbox',
    name: 'tc',
    inputId: 'tc',
    inputRef: refs.tcRef,
  },
];
