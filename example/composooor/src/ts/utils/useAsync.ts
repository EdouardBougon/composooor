import { useEffect, useState } from 'react';

type Callback<ReturnType> = () => Promise<ReturnType>;

export interface UseAsyncReturn<ReturnType, ErrorType = Error> {
  loading: boolean;
  error: ErrorType | undefined;
  data: ReturnType | undefined;
}

export function useAsync<ReturnType, ErrorType = Error>(
  callback: Callback<ReturnType>,
  skipIfDidntChanged?: React.DependencyList,
): UseAsyncReturn<ReturnType, ErrorType> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | undefined>();
  const [data, setData] = useState<ReturnType | undefined>();

  useEffect(() => {
    callback()
      .then((response: ReturnType) => {
        setLoading(false);
        setData(response);
      })
      .catch((err: ErrorType) => {
        setLoading(false);
        setError(err);
      });
  }, skipIfDidntChanged);

  return {
    loading: loading,
    error: error,
    data: data,
  };
}
