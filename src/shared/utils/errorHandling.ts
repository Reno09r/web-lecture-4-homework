type ErrorHandler = (error: unknown, context: string) => void;

const defaultErrorHandler: ErrorHandler = (error, context) => {
  console.error(`Error in ${context}:`, error);

};

export const withErrorHandling = <T extends (...args: any[]) => any>(
  fn: T,
  context: string,
  errorHandler: ErrorHandler = defaultErrorHandler
): T => {
  return ((...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (error) {
      errorHandler(error, context);
      return undefined;
    }
  }) as T;
}; 