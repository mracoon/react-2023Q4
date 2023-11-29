import {
  FormDataKeys,
  ICustomInputProps,
  InputPropsItemType,
  inputNames,
} from '../../types/types';

export const createInputsProps = (
  refs: Record<inputNames, React.RefObject<HTMLInputElement>>
): ICustomInputProps[] => {
  return inputProps.map((item) => ({
    ...item,
    inputRef: refs[item.name],
  }));
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
