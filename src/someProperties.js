export function pickProperties(obj, properties) {
  return properties.reduce((acc, property) => {
    if (obj.hasOwnProperty(property)) {
      acc[property] = obj[property];
    }
    return acc;
  }, {});
}
