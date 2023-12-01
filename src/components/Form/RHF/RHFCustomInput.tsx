import {
  FormDataKeys,
  InputPropsItemType,
  MyFormData,
} from '../../../types/types';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

export const RHFCustomInput = ({
  props,
  register,
  errorMessage,
}: {
  errorMessage?: string;
  props: InputPropsItemType;
  register: (
    name: FormDataKeys,
    options?: RegisterOptions<MyFormData, FormDataKeys> | undefined
  ) => UseFormRegisterReturn<FormDataKeys>;
}) => {
  return (
    <>
      <div className={`flex flex-col w-full items-start input-container`}>
        <label htmlFor={props.inputId}>{props.lableText}:</label>
        <input
          {...register(props.name)}
          id={props.inputId}
          type={props.inputType || 'text'}
        />
      </div>
      <p className="error-message">{errorMessage}</p>
    </>
  );
};
