/**
 * Group an array of objects by a key
 * @param {Array.<object>} array
 * @param {string} key
 * @returns {Object.<string, Array>}
 */
export function groupBy(array, key) {
  return array.reduce((acc, curr) => {
    const group = curr[key];
    const newArray = acc[group] ?  [...array, curr] : [curr];
    return {...acc, [group]: newArray};
  }, {});
}
