/**
 * Generate a range of integers
 * @param {number} min - The inclusive minimum value
 * @param {number} max - The inclusive maximum value
 * @returns {number[]} a list of integers from min to max
 */
export function range (min, max) {
  const length = max - min;
  return [...Array.of(length).keys()].map(i => i + min);
}
