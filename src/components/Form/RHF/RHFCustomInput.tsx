import { useState } from 'react';
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
  const [passType, setPassType] = useState('password');
  const isPasswordField = props.name === FormDataKeys.password;
  const isConfirmPasswordField = props.name === FormDataKeys.confirmPassword;
  const isPasswordType = isPasswordField || isConfirmPasswordField;
  const passwordFieldsClass = isPasswordType ? 'password-field' : '';

  const showPasswordHandler = () => {
    if (isPasswordType) {
      setPassType(passType === 'password' ? 'text' : 'password');
    }
  };
  return (
    <>
      <div
        className={`flex flex-col w-full items-start input-container ${passwordFieldsClass}`}
      >
        <label htmlFor={props.inputId}>{props.lableText}:</label>
        <input
          {...register(props.name)}
          id={props.inputId}
          type={isPasswordType ? passType : props.inputType || 'text'}
        />
        {isPasswordType && (
          <div
            className="show-password"
            onClick={() => showPasswordHandler()}
          />
        )}
      </div>
      <p className="error-message">{errorMessage}</p>
    </>
  );
};
