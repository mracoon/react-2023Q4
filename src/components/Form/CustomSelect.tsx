import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { FormDataKeys, MyFormData } from '../../types/types';

interface ISelectOptions {
  value: string;
  text: string;
}

interface ICustomSelectProps {
  lableText: string;
  name: FormDataKeys;
  inputId: string;
  inputRef?: React.RefObject<HTMLSelectElement>;
  autocomplete?: string;
  options: ISelectOptions[];
  register?: (
    name: FormDataKeys,
    options?: RegisterOptions<MyFormData, FormDataKeys> | undefined
  ) => UseFormRegisterReturn<FormDataKeys>;
}

export const CustomSelect = (props: ICustomSelectProps) => {
  return (
    <div className="flex flex-col w-full items-start input-container form-item">
      <label htmlFor={props.inputId}>{props.lableText}:</label>
      <select
        name={props.name}
        autoComplete={props.autocomplete}
        id={props.inputId}
        ref={props.inputRef}
        {...(props.register && { ...props.register(props.name) })}
      >
        {props.options.map(({ value, text }) => (
          <option value={value} key={`option-${props.name}-${value}`}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
