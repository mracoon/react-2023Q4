import { IApiError } from '../components/ResultsContainer/ResultsContainer';
import { BASE_URL } from './constants';

export async function getApiData<T>(
  controller: AbortController,
  queryString: string,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  setApiError: (value: React.SetStateAction<IApiError>) => void
) {
  try {
    const response = await fetch(`${BASE_URL}${queryString}`, {
      signal: controller.signal,
    });

    if (response.status >= 400 && response.status <= 600) {
      throw new Error(response.statusText);
    }
    const data: T = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const isAbortErr = error.name === 'AbortError';
      setIsLoading(isAbortErr);
      if (isAbortErr) {
        throw new Error();
      }
      setApiError({
        hasApiError: true,
        errorMessage: `${error.name}: ${error.message}`,
      });
    }
  }
  return null;
}
