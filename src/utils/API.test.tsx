import { Nullable } from '../types/apiDataTypes';
import { getApiData } from './API';

describe('getApiData', () => {
  let data: Nullable<{
    data: string;
  }> = null;

  const setIsLoadingStub = vi.fn();
  const setApiErrorStub = vi.fn();

  vi.spyOn(window, 'fetch')
    .mockImplementationOnce(() => {
      return Promise.resolve(
        new Response(null, { status: 404, statusText: 'test error' })
      );
    })
    .mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ data: 'test' }),
      } as Response);
    });

  beforeEach(async () => {
    vi.clearAllMocks();
    data = await getApiData(
      new AbortController(),
      '',
      setIsLoadingStub,
      setApiErrorStub
    );
  });

  it('should throw error when response status code 400...600', async () => {
    expect(setIsLoadingStub).toHaveBeenCalledWith(false);
    expect(setApiErrorStub).toHaveBeenCalledWith({
      hasApiError: true,
      errorMessage: `Error: test error`,
    });
    expect(data).toBeNull();
  });

  it('should return data when fetch resolved', async () => {
    expect(data?.data).toBe('test');
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
