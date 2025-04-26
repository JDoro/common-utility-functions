export function deepEquals(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key) || !deepEquals(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}
