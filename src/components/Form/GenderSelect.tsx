import { CustomSelect } from './CustomSelect';

export const GenderSelect = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLSelectElement>;
}) => {
  return (
    <CustomSelect
      lableText="Gender"
      name="gender"
      inputId="gender"
      inputRef={inputRef}
      options={[
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
      ]}
    ></CustomSelect>
  );
};
