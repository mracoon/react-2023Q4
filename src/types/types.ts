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
export type InputPropsItemType = {
  lableText: string;
  inputType: string;
  name: inputNames;
  inputId: string;
};
export type inputNames = Exclude<
  FormDataKeys,
  FormDataKeys.country | FormDataKeys.gender
>;
