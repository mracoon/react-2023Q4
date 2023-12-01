export type MyFormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tc?: boolean;
  image: FileList;
  country: string;
};

export enum FormDataKeys {
  name = 'name',
  age = 'age',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
  gender = 'gender',
  tc = 'tc',
  image = 'image',
  country = 'country',
}
export interface ICustomInputProps {
  lableText: string;
  inputType: string;
  name: string;
  inputId: string;
  inputRef: React.RefObject<HTMLInputElement>;
  autocomplete?: string;
  errorMessage?: string;
}

export interface ICustomPasswordInputProps extends ICustomInputProps {
  progressRef?: React.RefObject<HTMLProgressElement>;
}

interface InputBasePropsItemType {
  lableText: string;
  inputType: string;
  inputId: string;
}
export interface InputPropsItemType extends InputBasePropsItemType {
  name: inputNames;
}

export interface PasswordInputPropsItemType extends InputBasePropsItemType {
  name: passwordsInputNames;
}
export type inputNames = Exclude<
  FormDataKeys,
  | FormDataKeys.country
  | FormDataKeys.gender
  | FormDataKeys.password
  | FormDataKeys.confirmPassword
>;
export type passwordsInputNames =
  | FormDataKeys.password
  | FormDataKeys.confirmPassword;
