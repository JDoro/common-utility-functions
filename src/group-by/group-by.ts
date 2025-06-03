/**
 * Group an array of objects by a key
 * @param {Array.<object>} array
 * @param {string} key
 * @returns {Object.<string, Array>}
 */
export function groupBy<K extends string, T extends Record<K, string | number>>(array: T[], key: K) {
  return array.reduce((acc: {[k: string]: T[]}, curr: T) => {
    const group = curr[key];
    const newArray = acc[group] ? [...acc[group], curr] : [curr];
    return { ...acc, [group]: newArray };
  }, {});
}
