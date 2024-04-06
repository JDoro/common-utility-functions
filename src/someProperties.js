/**
 * This function returns a new object with only the properties specified in the properties array
 * @param {Object.<string, object>} obj
 * @param properties {Array.<string>}
 * @returns {Object.<string, object>}
 */
export function pickProperties(obj, properties) {
  return properties.reduce((acc, property) => {
    if (obj.hasOwnProperty(property)) {
      acc[property] = obj[property];
    }
    return acc;
  }, {});
}
