import { CustomSelect } from './CustomSelect';

export const CountriesSelect = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLSelectElement>;
}) => {
  return (
    <CustomSelect
      lableText="Countries"
      name="countries"
      inputId="countries"
      inputRef={inputRef}
      options={[
        { value: 'ru', text: 'Russia' },
        { value: 'by', text: 'Belarus' },
        { value: 'usa', text: 'USA' },
      ]}
    ></CustomSelect>
  );
};

/*        <label htmlFor="countries">Countries:</label>
          <select name="countries" autoComplete="country" id="countries">
            <option value="ru">Russia</option>
            <option value="by">Belarus</option>
            <option value="usa">USA</option>
          </select> */
