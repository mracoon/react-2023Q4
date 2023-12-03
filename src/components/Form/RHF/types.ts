import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import {
  FormDataKeys,
  InputPropsItemType,
  MyFormData,
  PasswordInputPropsItemType,
} from '../../../types/types';

export interface IRHFBaseProps {
  errorMessage?: string;
  register: (
    name: FormDataKeys,
    options?: RegisterOptions<MyFormData, FormDataKeys>
  ) => UseFormRegisterReturn<FormDataKeys>;
}

export interface IRHFCustomInputProps extends IRHFBaseProps {
  props: InputPropsItemType;
}

export interface IRHFPasswordInputProps extends IRHFBaseProps {
  props: PasswordInputPropsItemType;
  watch?: (name: FormDataKeys, defaultValue?: string) => string;
}
