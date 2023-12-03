import {
  FormDataKeys,
  ICustomPasswordInputProps,
  IUniversalCusttomInputProps,
  InputPropsItemType,
  PasswordInputPropsItemType,
  inputNames,
  passwordsInputNames,
} from '../../types/types';

export const createInputsProps = (
  refs: Record<inputNames, React.RefObject<HTMLInputElement>>
): IUniversalCusttomInputProps[] => {
  return inputProps.map((item) => ({
    ...item,
    inputRef: refs[item.name],
  }));
};

export const createPasswordsInputsProps = (
  refs: Record<passwordsInputNames, React.RefObject<HTMLInputElement>>,
  passwordStrenghtRef: React.RefObject<HTMLProgressElement>
): ICustomPasswordInputProps[] => {
  return passwordsProps.map((item) => {
    const progressRef =
      item.name === FormDataKeys.password ? passwordStrenghtRef : undefined;
    return {
      ...item,
      inputRef: refs[item.name],
      progressRef,
    };
  });
};

export const inputProps: InputPropsItemType[] = [
  {
    lableText: 'Name',
    inputType: 'text',
    name: FormDataKeys.name,
    inputId: 'name',
  },
  {
    lableText: 'Age',
    inputType: 'number',
    name: FormDataKeys.age,
    inputId: 'age',
  },
  {
    lableText: 'Email',
    inputType: 'text',
    name: FormDataKeys.email,
    inputId: 'email',
  },

  {
    lableText: 'Upload image',
    inputType: 'file',
    name: FormDataKeys.image,
    inputId: 'image',
  },
  {
    lableText: 'Accept T&C',
    inputType: 'checkbox',
    name: FormDataKeys.tc,
    inputId: 'tc',
  },
];

export const passwordsProps: PasswordInputPropsItemType[] = [
  {
    lableText: 'Password',
    inputType: 'password',
    name: FormDataKeys.password,
    inputId: 'password',
  },
  {
    lableText: 'Confirm password',
    inputType: 'password',
    name: FormDataKeys.confirmPassword,
    inputId: 'confirmPassword',
  },
];
