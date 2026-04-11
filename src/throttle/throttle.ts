/**
 * Creates a throttled function that only invokes the provided function at most once per every `limit` milliseconds.
 * The throttled function also has a `cancel` method to cancel delayed invocations and a `flush` method to immediately invoke them.
 *
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to throttle invocations to.
 * @returns A new throttled function.
 * @template T - A generic type that extends a function with any number of arguments and any return type.
 * @example
 * ```typescript
 * const expensiveOperation = (value: string) => {
 *   console.log(`Operating on: ${value}`);
 * };
 *
 * const throttledOperation = throttle(expensiveOperation, 500);
 *
 * throttledOperation('first'); // This will be executed
 * throttledOperation('second'); // This will be ignored
 *
 * setTimeout(() => {
 *   throttledOperation('third'); // This will be executed
 * }, 600);
 * ```
 * @since 1.0.0
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) & { cancel: () => void; flush: () => void } {
  let inThrottle: boolean;
  let lastArgs: Parameters<T> | null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastThis: any;

  const throttled = function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      inThrottle = true;
      func.apply(this, args);
      lastArgs = null;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          throttled.apply(lastThis, lastArgs);
        }
      }, limit);
    } else {
      lastArgs = args;
      lastThis = this;
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    inThrottle = false;
    lastArgs = null;
    timeoutId = null;
  };

  throttled.flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (lastArgs) {
      func.apply(lastThis, lastArgs);
    }
    inThrottle = false;
    lastArgs = null;
    timeoutId = null;
  };

  return throttled;
}
