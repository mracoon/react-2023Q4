import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { FormDataKeys, MyFormData } from '../../types/types';
import { CustomSelect } from './CustomSelect';

export const GenderSelect = ({
  inputRef,
  register,
}: {
  inputRef?: React.RefObject<HTMLSelectElement>;
  register?: (
    name: FormDataKeys,
    options?: RegisterOptions<MyFormData, FormDataKeys>
  ) => UseFormRegisterReturn<FormDataKeys>;
}) => {
  return (
    <CustomSelect
      lableText="Gender"
      name={FormDataKeys.gender}
      inputId="gender"
      inputRef={inputRef}
      register={register}
      options={[
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
      ]}
    ></CustomSelect>
  );
};
