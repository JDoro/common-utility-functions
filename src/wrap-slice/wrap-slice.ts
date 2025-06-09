/**
 * Creates a slice of an array with wrapping behavior for indices that exceed array bounds.
 * Unlike the standard Array.slice(), this function treats the array as circular,
 * wrapping around to the beginning when indices exceed the array length, and
 * wrapping to the end when indices are negative.
 *
 * @param arr - The array to slice from
 * @param startIndex - The starting index (inclusive). Can be negative or exceed array length
 * @param endIndex - The ending index (inclusive). Can be negative or exceed array length
 * @returns A new array containing elements from startIndex to endIndex with wrapping
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5];
 *
 * // Normal slice within bounds
 * wrapSlice(numbers, 1, 3); // [2, 3, 4]
 *
 * // Wrapping beyond array length
 * wrapSlice(numbers, 3, 7); // [4, 5, 1, 2, 3]
 *
 * // Negative indices wrap to end
 * wrapSlice(numbers, -2, 1); // [4, 5, 1, 2]
 *
 * // Single element
 * wrapSlice(numbers, 0, 0); // [1]
 *
 * // Wrapping multiple times
 * wrapSlice(numbers, 0, 9); // [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
 * ```
 * @throws Will produce unexpected results if the array is empty
 * @since 1.0.0
 */
export function wrapSlice<T>(arr: T[], startIndex: number, endIndex: number): T[] {
  const result: T[] = [];
  for (let x = startIndex; x < endIndex + 1; x++) {
    const normalizedIndex = x % arr.length;
    if (normalizedIndex < 0) {
      result.push(arr[arr.length + normalizedIndex]);
    } else {
      result.push(arr[normalizedIndex]);
    }
  }
  return result;
}
