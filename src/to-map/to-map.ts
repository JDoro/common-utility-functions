/**
 *  Convert an array to a key-value map using a string key. The inner function of the `array.reduce` method mutates the
 *  accumulator object (`acc`) instad of using immutability, `{...acc, [curr[key]]: curr}` because this is inefficient
 *  space-wise. The spread operator creates a new object every time it is called, which is inefficient for large arrays.
 * @param {Array.<object>} array - The array to convert to a map
 * @param {string} key - The name of the property used as the key
 * @returns {Object.<string, object>} - a new object literal with the key-value pairs
 */
export function toMap<K extends string, T extends Record<K, string>>(
  array: T[],
  key: K
): {[k: string]: T} {
  return array.reduce((acc: {[k: string]: T}, curr: T) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});
}
