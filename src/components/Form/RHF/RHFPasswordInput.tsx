import { useEffect, useState } from 'react';
import { FormDataKeys } from '../../../types/types';
import { formValidationSchema } from '../../../utils/createValidationSchema';
import { ValidationError } from 'yup';
import { IRHFPasswordInputProps } from './types';

export const RHFPasswordInput = ({
  props,
  register,
  errorMessage,
  watch,
}: IRHFPasswordInputProps) => {
  const [passType, setPassType] = useState('password');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordValue = watch ? watch(FormDataKeys.password) : undefined;

  const showPasswordHandler = () => {
    setPassType(passType === 'password' ? 'text' : 'password');
  };

  useEffect(() => {
    try {
      formValidationSchema.validateSync(
        {
          password: passwordValue,
        },
        { abortEarly: false }
      );
    } catch (err) {
      if (err instanceof ValidationError) {
        let strength = 4;
        err.inner.forEach((error) => {
          if (
            error.path &&
            error.path === 'password' &&
            error.message.includes('Password must contain at least')
          ) {
            strength -= 1;
          }
        });
        setPasswordStrength(strength);
      }
    }
  }, [passwordValue]);

  return (
    <>
      <div
        className={`flex flex-col w-full items-start input-container password-field`}
      >
        <label htmlFor={props.inputId}>{props.lableText}:</label>
        <input {...register(props.name)} id={props.inputId} type={passType} />

        <div className="show-password" onClick={() => showPasswordHandler()} />
      </div>
      {props.name === FormDataKeys.password && (
        <div className="strength-container">
          <label htmlFor="strenght">Password strenght </label>
          <progress
            id={'strenght'}
            max="4"
            value={passwordStrength}
            className="strenght"
          />
        </div>
      )}
      <p className="error-message">{errorMessage}</p>
    </>
  );
};
