import { FormDataKeys, ICountriesSelectProps } from '../../types/types';
import CountriesDataList from './CountriesDataList';

const CountriesSelect = ({
  inputRef,
  errorMessage,
  register,
}: ICountriesSelectProps) => {
  return (
    <div className="flex flex-col items-start justify-start w-full form-item">
      <div className="relative flex flex-col w-full items-start input-container">
        <label htmlFor="countries">Countries:</label>
        <input
          id="countries"
          type="text"
          name={FormDataKeys.country}
          className="w-full"
          placeholder="Choose country..."
          ref={inputRef}
          {...(register && { ...register(FormDataKeys.country) })}
          list="countries-list"
        />

        <CountriesDataList />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CountriesSelect;
