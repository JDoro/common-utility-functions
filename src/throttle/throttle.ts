/**
 * Creates a throttled function that only invokes the provided function at most once per every `limit` milliseconds.
 * The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them.
 *
 * @param func - The function to throttle.
 * @param limit - The number of milliseconds to throttle invocations to.
 * @returns A new function that throttles execution.
 * @template T - A generic type that extends a function with any number of arguments and any return type.
 * @example
 * ```typescript
 * const expensiveOperation = () => {
 *   console.log('Performing an expensive operation...');
 * };
 *
 * const throttledOperation = throttle(expensiveOperation, 1000);
 *
 * window.addEventListener('resize', throttledOperation);
 *
 * // To cancel the throttled invocation
 * throttledOperation.cancel();
 *
 * // To immediately invoke the function
 * throttledOperation.flush();
 * ```
 * @since 1.0.0
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => ReturnType<T> | undefined) & { cancel: () => void; flush: () => ReturnType<T> | undefined; } {
    let lastCallTime: number | null = null;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any;
    let result: ReturnType<T> | undefined;

    function later() {
        lastCallTime = Date.now();
        timeout = null;
        result = func.apply(lastThis, lastArgs as Parameters<T>);
    }

    const throttled = function(this: any, ...args: Parameters<T>) {
        const now = Date.now();
        lastArgs = args;
        lastThis = this;

        if (lastCallTime === null) {
            lastCallTime = now;
            result = func.apply(this, args);
            return result;
        }

        const remaining = limit - (now - lastCallTime);

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastCallTime = now;
            result = func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };

    throttled.cancel = () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = null;
        lastCallTime = null;
    };

    throttled.flush = () => {
        if (timeout) {
            clearTimeout(timeout);
            later();
        }
        return result;
    };

    return throttled as ((...args: Parameters<T>) => ReturnType<T> | undefined) & { cancel: () => void; flush: () => ReturnType<T> | undefined; };
}
