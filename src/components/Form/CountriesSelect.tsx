import { countries } from '../../utils/countriesList';

const CountriesSelect = ({
  inputRef,
  errorMessage,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full ">
      <div className="relative flex flex-col w-full items-start input-container">
        <label htmlFor="countries">Countries:</label>
        <input
          id="countries"
          type="text"
          name="country"
          className="w-full"
          placeholder="Choose country..."
          ref={inputRef}
          list="countries-list"
        />

        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </datalist>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CountriesSelect;
