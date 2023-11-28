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
    inputType: 'text',
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
    name: 'image',
    inputId: 'image',
    inputRef: refs.imageRef,
  },
];
