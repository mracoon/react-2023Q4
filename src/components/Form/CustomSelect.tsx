interface ISelectOptions {
  value: string;
  text: string;
}

interface ICustomSelectProps {
  lableText: string;
  name: string;
  inputId: string;
  inputRef: React.RefObject<HTMLSelectElement>;
  autocomplete?: string;
  options: ISelectOptions[];
}

export const CustomSelect = ({
  lableText,
  name,
  inputId,
  autocomplete,
  inputRef,
  options,
}: ICustomSelectProps) => {
  return (
    <div className="flex flex-col w-full items-start input-container form-item">
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
