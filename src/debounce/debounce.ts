/**
 * Creates a debounced function that delays invoking the provided function until after a certain number of milliseconds have passed since the last time it was invoked.
 * The debounced function returns a promise that resolves with the result of the last invocation or rejects if the invocation throws an error.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A new function that delays execution and returns a promise.
 * @template T - A generic type that extends a function with any number of arguments and any return type.
 * @example
 * ```typescript
 * const expensiveOperation = async (value: string) => {
 *   if (value === 'error') {
 *     throw new Error('Operation failed');
 *   }
 *   console.log(`Operating on: ${value}`);
 *   return value.toUpperCase();
 * };
 *
 * const debouncedOperation = debounce(expensiveOperation, 500);
 *
 * // This will resolve with "SUCCESS"
 * debouncedOperation('success').then(console.log);
 *
 * // This will reject with an error
 * debouncedOperation('error').catch(console.error);
 * ```
 * @since 1.0.0
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let pendingPromises: {
    resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void;
    reject: (reason?: any) => void;
  }[] = [];

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const promise = new Promise<ReturnType<T>>((resolve, reject) => {
      pendingPromises.push({ resolve, reject });
    });

    timeoutId = setTimeout(async () => {
      try {
        const result = await func(...args);
        pendingPromises.forEach(({ resolve }) => resolve(result));
      } catch (error) {
        pendingPromises.forEach(({ reject }) => reject(error));
      } finally {
        pendingPromises = [];
      }
    }, delay);

    return promise;
  };
}
