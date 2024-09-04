/**
 * @desc This file contains type definitions for functions used in the web-app-vite project.
 */

/**
 * @desc Function that uses fetch api and returns a promise.
 */
export type FetchFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

/**
 * @desc Function that uses fetch api and returns a promise. Requires an auth token as first argument.
 */
export type AuthedFetchFunction<T, Args extends any[]> = (token: string, ...args: Args) => Promise<T>;
