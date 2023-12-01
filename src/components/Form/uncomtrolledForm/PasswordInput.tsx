import { ICustomPasswordInputProps } from '../../../types/types';

export const PasswordInput = (props: ICustomPasswordInputProps) => {
  const showPasswordHandler = () => {
    const input = props.inputRef.current;
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
        <label htmlFor={props.inputId}>{props.lableText}:</label>{' '}
        <input
          className="w-full"
          type={props.inputType}
          name={props.name}
          autoComplete={props.autocomplete || 'on'}
          id={props.inputId}
          ref={props.inputRef}
        />
        <div
          className="show-password"
          onClick={() => {
            showPasswordHandler();
          }}
        />
      </div>
      {props.progressRef && (
        <div className="strength-container">
          <label htmlFor="strenght">Password strenght </label>
          <progress
            id={'strenght'}
            max="4"
            defaultValue="0"
            ref={props.progressRef}
            className="strenght"
          />
        </div>
      )}
      {props.errorMessage && (
        <p className="error-message">{props.errorMessage}</p>
      )}
    </>
  );
};
