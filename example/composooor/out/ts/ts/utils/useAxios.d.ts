/// <reference types="react" />
import type { UseAsyncReturn } from './useAsync';
import type { AxiosRequestConfig } from 'axios';
export declare function useAxiosGet<QueryParamsType, ReturnType>(url: string, options: AxiosRequestConfig<QueryParamsType>, skipIfDidntChanged?: React.DependencyList): UseAsyncReturn<ReturnType>;
