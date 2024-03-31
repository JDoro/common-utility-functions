/**
 *  Convert an array to a key-value map using a string key
 * @param {Array.<object>} array
 * @param {string} key
 * @returns {Object.<string, object>}
 */
export function toMap(array, key) {
  return array.reduce((acc, curr) => ({...acc, [curr[key]]: curr}), {});
}
