import { StateCreator } from 'zustand';

type ErrorMiddleware = <T extends object>(
  config: StateCreator<T>
) => StateCreator<T>;

export const errorMiddleware: ErrorMiddleware = (config) => (set, get, api) => {
  const wrappedSet = (partial: any, replace?: boolean) => {
    try {
      set(partial, replace);
    } catch (error) {
      console.error('Store error:', error);
    }
  };

  return config(wrappedSet, get, api);
}; 