/**
 * @file Retry.tsx
 * @desc This file contains custom hooks for retrying fetch functions.
 */

import { useCallback, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FetchFunction, AuthedFetchFunction } from "../Types/Functions";


/**
 * Custom hook to retry a commonApiCalls fetch function with a delay and a max number of retries.
 * 
 * This adheres to the FetchFunction type definition. see Types/Functions.ts for more details.
 */
export function useFetchRetry <T, Args extends any[]>(
  fetchFn: FetchFunction<T, Args>,
  maxRetries: number = 3,
  retryDelay: number = 1000
) {
  return useCallback(
    async (...args: Args): Promise<T | null> => {
      const attempt = async (retryCount: number): Promise<T | null> => {
        if (retryCount > maxRetries) {
          console.error('Max retries exceeded');
          return null;
        }

        try {
          return await fetchFn(...args);
        } catch (error) {
          console.error('Error in fetch function:', error);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attempt(retryCount + 1);
        }
      };

      return attempt(0);
    },
    [fetchFn, maxRetries, retryDelay]
  );
}


/**
 * Custom hook to retry a commonApiCalls fetch function that needs an auth token.
 * 
 * This automatically extracts the `token` and `isAuthLoading` state from the AuthContext,
 * so you don't need to pass them in as arguments to your wrapped fetch function.
 * 
 * When refreshing a page that contains fetch calls, you will often run into a race condition
 * between AuthContext react DOM rerendering and the fetch calls. This hook will retry the fetch
 * function until the authentication token is loaded (with a delay and a max number of retries).
 * 
 * This adheres to the AuthedFetchFunction type definition. see Types/Functions.ts for more details.
 * 
 */
export function useAuthFetchRetry<T, Args extends any[]>(
  fetchFn: AuthedFetchFunction<T, Args>,
  maxRetries: number = 3,
  retryDelay: number = 1000
) {
  const { token, isAuthLoading } = useContext(AuthContext);

  return useCallback(
    async (...args: Args): Promise<T | null> => {
      const attempt = async (retryCount: number): Promise<T | null> => {
        if (isAuthLoading) {
          // If still loading auth, wait and retry
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attempt(retryCount);
        }

        if (token === null) {
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return attempt(retryCount + 1);
          }
          console.error('Authentication failed after max retries');
          return null;
        }

        try {
          return await fetchFn(token, ...args);
        } catch (error) {
          console.error('Error in fetch function:', error);
          return null;
        }
      };

      return attempt(0);
    },
    [fetchFn, token, isAuthLoading, maxRetries, retryDelay]
  );
}