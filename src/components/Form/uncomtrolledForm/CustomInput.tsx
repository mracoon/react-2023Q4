import { ICustomInputProps } from '../../../types/types';

export const CustomInput = ({
  lableText,
  inputType,
  name,
  inputId,
  autocomplete,
  inputRef,
  errorMessage,
}: ICustomInputProps) => {
  return (
    <>
      <div className={`flex flex-col w-full items-start input-container`}>
        <label htmlFor={inputId}>{lableText}:</label>
        <input
          className="w-full"
          type={inputType}
          name={name}
          autoComplete={autocomplete || 'on'}
          id={inputId}
          ref={inputRef}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
};
