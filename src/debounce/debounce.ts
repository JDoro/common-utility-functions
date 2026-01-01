/**
 * Creates a debounced function that delays invoking the provided function until after a certain number of milliseconds have passed since the last time it was invoked.
 *
 * @param func - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @returns A new function that delays execution of the original function.
 * @template T - A generic type that extends a function with any number of arguments and any return type.
 * @example
 * ```typescript
 * // Returns a function that can be called any number of times, but will only execute once the calls stop for 500ms
 * const debouncedSave = debounce((value: string) => console.log(`Saving: ${value}`), 500);
 *
 * // Triggers the debounced function
 * debouncedSave('Hello');
 * debouncedSave('Hello World');
 * // After 500ms, "Saving: Hello World" will be logged.
 * ```
 * @since 1.0.0
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
