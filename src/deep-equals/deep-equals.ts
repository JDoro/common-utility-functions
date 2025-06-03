export function deepEquals<T extends { [k: string]: unknown }>(
  obj1: T | string | number | undefined | null,
  obj2: T | string | number | undefined | null,
): boolean {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return false;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  return Object.keys(obj1).every(
    (key: keyof T) =>
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      deepEquals(obj1[key] as { [k: string]: unknown }, obj2[key] as { [k: string]: unknown }),
  );
}
