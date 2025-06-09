/**
 * Creates a new object containing only the specified properties from the source object.
 * This is useful for creating subsets of objects, filtering out unwanted properties,
 * or preparing objects for serialization. Properties that don't exist on the source
 * object are safely ignored.
 *
 * @param obj - The source object to pick properties from
 * @param properties - An array of property names to include in the new object
 * @returns A new object containing only the specified properties that exist on the source object
 * @example
 * ```typescript
 * const user = {
 *   id: 1,
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'secret123',
 *   lastLogin: '2023-01-01',
 *   isActive: true
 * };
 *
 * // Pick only safe properties for API response
 * const publicUser = pickProperties(user, ['id', 'name', 'email', 'isActive']);
 * // Result: { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true }
 *
 * // Pick non-existent properties (safely ignored)
 * const partial = pickProperties(user, ['name', 'nonExistent']);
 * // Result: { name: 'John Doe' }
 *
 * // Empty properties array returns empty object
 * const empty = pickProperties(user, []);
 * // Result: {}
 *
 * // Useful for form data extraction
 * const formData = { name: 'Jane', email: 'jane@test.com', csrf: 'token123' };
 * const cleanData = pickProperties(formData, ['name', 'email']);
 * // Result: { name: 'Jane', email: 'jane@test.com' }
 * ```
 * @since 1.0.0
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
