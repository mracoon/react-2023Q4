import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import CountriesDataList from '../CountriesDataList';
import { FormDataKeys, MyFormData } from '../../../types/types';

const RHFCountriesSelect = ({
  errorMessage,
  register,
}: {
  errorMessage?: string;
  register: (
    name: FormDataKeys,
    options?: RegisterOptions<MyFormData, FormDataKeys> | undefined
  ) => UseFormRegisterReturn<FormDataKeys>;
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full form-item">
      <div className="relative flex flex-col w-full items-start input-container">
        <label htmlFor="countries">Countries:</label>
        <input
          id="countries"
          type="text"
          className="w-full"
          placeholder="Choose country..."
          {...register(FormDataKeys.country)}
          list="countries-list"
        />

        <CountriesDataList />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default RHFCountriesSelect;
