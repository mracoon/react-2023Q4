interface ISelectOptions {
  value: string;
  text: string;
}

interface ICustomSelectProps {
  lableText: string;
  //inputType: string;
  name: string;
  inputId: string;
  inputRef: React.RefObject<HTMLSelectElement>;
  autocomplete?: string;
  options: ISelectOptions[];
}

export const CustomSelect = ({
  lableText,
  // inputType,
  name,
  inputId,
  autocomplete,
  inputRef,
  options,
}: ICustomSelectProps) => {
  return (
    <div>
      <label htmlFor={inputId}>{lableText}:</label>
      <select
        name={name}
        autoComplete={autocomplete}
        id={inputId}
        ref={inputRef}
      >
        {options.map(({ value, text }) => (
          <option value={value} key={`option-${name}-${value}`}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
