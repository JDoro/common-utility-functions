/**
 * Converts an array of objects into a key-value map using a specified property as the key.
 * This function is optimized for performance by mutating the accumulator object rather than
 * using the spread operator, making it efficient for large arrays. If multiple objects have
 * the same key value, later objects will overwrite earlier ones.
 *
 * @param array - The array of objects to convert to a map
 * @param key - The property name to use as the map key (must exist on all objects and have string values)
 * @returns A new object where keys are the specified property values and values are the original objects
 * @example
 * ```typescript
 * const users = [
 *   { id: '1', name: 'John', role: 'admin' },
 *   { id: '2', name: 'Jane', role: 'user' },
 *   { id: '3', name: 'Bob', role: 'user' }
 * ];
 *
 * const userMap = toMap(users, 'id');
 * // Result: {
 * //   '1': { id: '1', name: 'John', role: 'admin' },
 * //   '2': { id: '2', name: 'Jane', role: 'user' },
 * //   '3': { id: '3', name: 'Bob', role: 'user' }
 * // }
 *
 * // Access by key
 * console.log(userMap['1'].name); // 'John'
 *
 * // Duplicate keys - last one wins
 * const items = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' }
 * ];
 * const categoryMap = toMap(items, 'category');
 * // Result: { 'fruit': { category: 'fruit', name: 'banana' } }
 * ```
 * @since 1.0.0
 */
export function toMap<K extends string, T extends Record<K, string>>(
  array: T[],
  key: K
): {[k: string]: T} {
  return array.reduce((acc: {[k: string]: T}, curr: T) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});
}
