import { ChangeEvent, useState } from 'react';
import { countries } from '../../utils/countriesList';

const CountriesSelect = ({
  countriesRef,
  errorMessage,
}: {
  countriesRef: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const filteredCountryList = countries.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filteredCountryList);
  };

  const clickHandler = (countryOption: string) => {
    setInputValue(countryOption);
    setFilteredCountries([]);
  };
  const blurHandler = () => {
    setTimeout(() => {
      setFilteredCountries([]);
    }, 100);
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <div className="relative">
        <label htmlFor="countries">Countries:</label>
        <input
          id="countries"
          type="text"
          value={inputValue}
          name="country"
          onChange={inputChangeHandler}
          placeholder="Choose country..."
          onBlur={blurHandler}
          ref={countriesRef}
          onFocus={inputChangeHandler}
        />
        {filteredCountries.length > 0 && (
          <ul className="max-h-40 overflow-y-auto absolute bg-slate-100">
            {filteredCountries.map((countryOption, index) => (
              <li
                key={`country-${index}`}
                onClick={() => clickHandler(countryOption)}
              >
                {countryOption}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CountriesSelect;
