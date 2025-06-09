import { deepEquals, pickProperties } from '../';

/**
 * Compares two objects for equality based only on specified properties.
 * Extracts the specified properties from both objects and performs a deep equality
 * comparison on the resulting subsets. This is useful when you want to compare
 * objects while ignoring certain properties.
 *
 * @param obj1 - The first object to compare
 * @param obj2 - The second object to compare
 * @param properties - An array of property names to include in the comparison
 * @returns True if the specified properties are deeply equal between the objects, false otherwise
 * @example
 * ```typescript
 * const user1 = { id: 1, name: 'John', email: 'john@example.com', lastLogin: '2023-01-01' };
 * const user2 = { id: 1, name: 'John', email: 'john@example.com', lastLogin: '2023-01-02' };
 *
 * // Compare only name and email (ignoring id and lastLogin)
 * propertiesEqual(user1, user2, ['name', 'email']); // true
 *
 * // Compare all properties
 * propertiesEqual(user1, user2, ['id', 'name', 'email', 'lastLogin']); // false
 *
 * // Empty properties array always returns true
 * propertiesEqual(user1, user2, []); // true
 *
 * // Works with nested objects
 * const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4 };
 * const obj2 = { a: 1, b: { c: 2, d: 4 }, e: 5 };
 * propertiesEqual(obj1, obj2, ['a']); // true
 * propertiesEqual(obj1, obj2, ['b']); // false
 * ```
 * @since 1.0.0
 */
export function propertiesEqual<
  K extends string,
  T extends Record<K, T | string | number | undefined | null>,
>(obj1: T, obj2: T, properties: string[]): boolean {
  const newObj1 = pickProperties(obj1, properties);
  const newObj2 = pickProperties(obj2, properties);
  return deepEquals(newObj1, newObj2);
}
