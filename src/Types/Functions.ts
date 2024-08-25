/**
 * @desc This file contains type definitions for functions used in the web-app-react project.
 */

// FetchFunction type definition
export type FetchFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

// AuthedFetchFunction type definition
export type AuthedFetchFunction<T, Args extends any[]> = (token: string, ...args: Args) => Promise<T>;
