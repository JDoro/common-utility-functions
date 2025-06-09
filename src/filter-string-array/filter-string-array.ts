/**
 * Filters an array of strings to include only those that contain the specified substring.
 * Uses the native String.includes() method for case-sensitive substring matching.
 *
 * @param array - The array of strings to filter
 * @param filter - The substring to search for within each string
 * @returns A new array containing only strings that include the filter substring
 * @example
 * ```typescript
 * const fruits = ['apple', 'banana', 'apricot', 'grape'];
 *
 * filterStringArray(fruits, 'ap'); // ['apple', 'apricot']
 * filterStringArray(fruits, 'ban'); // ['banana']
 * filterStringArray(fruits, 'xyz'); // []
 *
 * // Empty filter matches all strings
 * filterStringArray(fruits, ''); // ['apple', 'banana', 'apricot', 'grape']
 *
 * // Case sensitive
 * filterStringArray(['Hello', 'hello'], 'H'); // ['Hello']
 * ```
 * @since 1.0.0
 */
export function filterStringArray(array: string[], filter: string): string[] {
  return array.filter((item) => item.includes(filter));
}
