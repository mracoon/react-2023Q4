import { useAppSelector } from '../../hooks/redux';

const CountriesDataList = () => {
  const { countries } = useAppSelector((state) => state.countriesReducer);

  return (
    <datalist id="countries-list">
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </datalist>
  );
};

export default CountriesDataList;
