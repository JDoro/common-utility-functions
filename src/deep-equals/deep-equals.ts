/**
 * Performs a deep equality comparison between two values.
 * Recursively compares objects by their properties and handles primitive values,
 * null, and undefined. Arrays are not specifically handled and will be compared
 * as objects with numeric string keys.
 *
 * @param obj1 - The first value to compare (can be object, primitive, null, or undefined)
 * @param obj2 - The second value to compare (can be object, primitive, null, or undefined)
 * @returns True if the values are deeply equal, false otherwise
 * @example
 * ```typescript
 * // Primitive values
 * deepEquals(1, 1); // true
 * deepEquals('hello', 'hello'); // true
 * deepEquals(null, null); // true
 *
 * // Objects
 * deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 * deepEquals({ a: 1, b: 2 }, { a: 1, b: 3 }); // false
 *
 * // Nested objects
 * deepEquals(
 *   { user: { name: 'John', age: 30 } },
 *   { user: { name: 'John', age: 30 } }
 * ); // true
 *
 * // Different types
 * deepEquals(1, '1'); // false
 * deepEquals(null, undefined); // false
 * ```
 * @since 1.0.0
 */
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
