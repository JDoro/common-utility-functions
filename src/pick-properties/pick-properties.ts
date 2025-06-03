/**
 * This function returns a new object with only the properties specified in the properties array
 * @param {Object.<string, object>} obj
 * @param properties {Array.<string>}
 * @returns {Object.<string, object>}
 */
export function pickProperties<K extends string, T extends Record<K | string, unknown>>(
  obj: T,
  properties: K[],
): Partial<T> {
  return properties.reduce((acc: Partial<T>, property: K) => {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      acc[property] = obj[property];
    }
    return acc;
  }, {});
}
