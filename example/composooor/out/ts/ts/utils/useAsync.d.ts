/// <reference types="react" />
type Callback<ReturnType> = () => Promise<ReturnType>;
export interface UseAsyncReturn<ReturnType, ErrorType = Error> {
    loading: boolean;
    error: ErrorType | undefined;
    data: ReturnType | undefined;
}
export declare function useAsync<ReturnType, ErrorType = Error>(callback: Callback<ReturnType>, skipIfDidntChanged?: React.DependencyList): UseAsyncReturn<ReturnType, ErrorType>;
export {};
