/**
 * Generate a range of integers
 * @param {number} min - The inclusive minimum value
 * @param {number} max - The inclusive maximum value
 * @returns {number[]} a list of integers from min to max
 */
export function range(min: number, max: number): number[] {
  const length = max - min + 1;
  return Array.from({ length }, (_, i) => i + min);
}
