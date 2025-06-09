/**
 * Generates an array of consecutive integers within a specified range.
 * Both the minimum and maximum values are included in the result.
 * If min is greater than max, an empty array is returned.
 *
 * @param min - The inclusive minimum value (starting point of the range)
 * @param max - The inclusive maximum value (ending point of the range)
 * @returns An array of integers from min to max (inclusive)
 * @example
 * ```typescript
 * // Basic range
 * range(1, 5); // [1, 2, 3, 4, 5]
 *
 * // Single number range
 * range(3, 3); // [3]
 *
 * // Negative numbers
 * range(-2, 2); // [-2, -1, 0, 1, 2]
 *
 * // Invalid range (min > max)
 * range(5, 1); // [] (empty array)
 *
 * // Zero-based range
 * range(0, 4); // [0, 1, 2, 3, 4]
 *
 * // Useful for iterations
 * range(1, 3).forEach(i => console.log(`Item ${i}`));
 * // Outputs: "Item 1", "Item 2", "Item 3"
 * ```
 * @since 1.0.0
 */
export function range(min: number, max: number): number[] {
  const length = max - min + 1;
  return Array.from({ length }, (_, i) => i + min);
}
