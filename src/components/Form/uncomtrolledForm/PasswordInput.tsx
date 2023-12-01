import { ICustomPasswordInputProps } from '../../../types/types';

export const PasswordInput = ({
  lableText,
  inputType,
  name,
  inputId,
  autocomplete,
  inputRef,
  errorMessage,
  progressRef,
}: ICustomPasswordInputProps) => {
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
        className={`flex flex-col w-full items-start input-container password-field`}
      >
        <label htmlFor={inputId}>{lableText}:</label>{' '}
        <input
          className="w-full"
          type={inputType}
          name={name}
          autoComplete={autocomplete || 'on'}
          id={inputId}
          ref={inputRef}
        />
        <div
          className="show-password"
          onClick={() => {
            showPasswordHandler();
          }}
        />
      </div>{' '}
      {progressRef && (
        <div className="strength-container">
          <label htmlFor="strenght">Password strenght </label>
          <progress
            id={'strenght'}
            max="4"
            defaultValue="0"
            ref={progressRef}
            className="strenght"
          />
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
};
