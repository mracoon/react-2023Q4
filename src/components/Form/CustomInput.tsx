import { IUniversalCusttomInputProps } from '../../types/types';

export const CustomInput = (props: IUniversalCusttomInputProps) => {
  return (
    <>
      <div className={`flex flex-col w-full items-start input-container`}>
        <label htmlFor={props.inputId}>{props.lableText}:</label>
        <input
          className="w-full"
          type={props.inputType || 'text'}
          name={props.name}
          autoComplete={props.autocomplete || 'on'}
          id={props.inputId}
          ref={props.inputRef}
          {...(props.register && { ...props.register(props.name) })}
        />
      </div>
      {props.errorMessage && (
        <p className="error-message">{props.errorMessage}</p>
      )}
    </>
  );
};
