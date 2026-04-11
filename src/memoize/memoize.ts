/**
 * Creates a memoized function that caches the results of the provided function.
 * The cache key is determined by the identity of the arguments passed to the function.
 *
 * @param func - The function to memoize.
 * @returns A new function that caches the results of the original function.
 * @template T - A generic type that extends a function with any number of arguments and any return type.
 * @example
 * ```typescript
 * const expensiveOperation = (value: object) => {
 *   console.log(`Operating on: ${JSON.stringify(value)}`);
 *   return value;
 * };
 *
 * const memoizedOperation = memoize(expensiveOperation);
 * const obj = { a: 1 };
 *
 * // "Operating on: {"a":1}" is logged, and the result is { a: 1 }
 * memoizedOperation(obj);
 *
 * // The result is { a: 1 }, but the original function is not called again because the result is cached
 * memoizedOperation(obj);
 * ```
 * @since 1.1.0
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<any, any>();
  const RESULT_KEY = Symbol('memoize-result');

  return (...args: Parameters<T>): ReturnType<T> => {
    let currentCache = cache;

    for (const arg of args) {
      if (!currentCache.has(arg)) {
        currentCache.set(arg, new Map<any, any>());
      }
      currentCache = currentCache.get(arg);
    }

    if (currentCache.has(RESULT_KEY)) {
      return currentCache.get(RESULT_KEY) as ReturnType<T>;
    }

    const result = func(...args);
    currentCache.set(RESULT_KEY, result);

    return result;
  };
}
