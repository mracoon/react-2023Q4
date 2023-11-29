import { FormDataKeys, ICustomInputProps } from '../../../types/types';

export const CustomInput = ({
  lableText,
  inputType,
  name,
  inputId,
  autocomplete,
  inputRef,
  errorMessage,
}: ICustomInputProps) => {
  const isPasswordField = name === FormDataKeys.password;
  const isConfirmPasswordField = name === FormDataKeys.confirmPassword;
  const isPasswordType = isPasswordField || isConfirmPasswordField;
  const passwordFieldsClass = isPasswordType ? 'password-field' : '';

  const showPasswordHandler = () => {
    const input = inputRef.current;
    if (input) {
      input.type === 'password'
        ? (input.type = 'text')
        : (input.type = 'password');
    }
  };

  return (
    <>
      <div
        className={`flex flex-col w-full items-start input-container ${passwordFieldsClass}`}
      >
        <label htmlFor={inputId}>{lableText}:</label>
        <input
          className="w-full"
          type={inputType}
          name={name}
          autoComplete={autocomplete || 'on'}
          id={inputId}
          ref={inputRef}
        />
        {['password', 'confirmPassword'].includes(name) && (
          <div
            className="show-password"
            onClick={() => {
              showPasswordHandler();
            }}
          />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
};
