import type { UseAsyncReturn } from './useAsync';
import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { useAsync } from './useAsync';

export function useAxiosGet<QueryParamsType, ReturnType>(
  url: string,
  options: AxiosRequestConfig<QueryParamsType>,
  skipIfDidntChanged?: React.DependencyList,
): UseAsyncReturn<ReturnType> {
  return useAsync(async () => {
    return axios.get<QueryParamsType, ReturnType>(url, options);
  }, skipIfDidntChanged);
}
