export interface ICustomInputProps {
  lableText: string;
  inputType: string;
  name: string;
  inputId: string;
  inputRef: React.RefObject<HTMLInputElement>;
  autocomplete?: string;
  errorMessage?: string;
}

export const CustomInput = ({
  lableText,
  inputType,
  name,
  inputId,
  autocomplete,
  inputRef,
  errorMessage,
}: ICustomInputProps) => {
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
      <div>
        <label htmlFor={inputId}>{lableText}:</label>
        <input
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
