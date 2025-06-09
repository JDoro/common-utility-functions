/**
 * Groups an array of objects by the value of a specified property.
 * Creates a new object where each key represents a unique value from the specified
 * property, and each value is an array of objects that have that property value.
 * Uses immutable operations to avoid mutating the original array.
 *
 * @param array - The array of objects to group
 * @param key - The property name to group by (must exist on all objects and have string or number values)
 * @returns An object where keys are the unique property values and values are arrays of matching objects
 * @example
 * ```typescript
 * const employees = [
 *   { name: 'John', department: 'Engineering', salary: 75000 },
 *   { name: 'Jane', department: 'Marketing', salary: 65000 },
 *   { name: 'Bob', department: 'Engineering', salary: 80000 },
 *   { name: 'Alice', department: 'Marketing', salary: 70000 }
 * ];
 *
 * const byDepartment = groupBy(employees, 'department');
 * // Result: {
 * //   'Engineering': [
 * //     { name: 'John', department: 'Engineering', salary: 75000 },
 * //     { name: 'Bob', department: 'Engineering', salary: 80000 }
 * //   ],
 * //   'Marketing': [
 * //     { name: 'Jane', department: 'Marketing', salary: 65000 },
 * //     { name: 'Alice', department: 'Marketing', salary: 70000 }
 * //   ]
 * // }
 *
 * // Group by numeric values
 * const products = [
 *   { name: 'Laptop', price: 1000, category: 1 },
 *   { name: 'Mouse', price: 25, category: 1 },
 *   { name: 'Desk', price: 300, category: 2 }
 * ];
 * const byCategory = groupBy(products, 'category');
 * // Groups by category: { '1': [...], '2': [...] }
 * ```
 * @since 1.0.0
 */
export function groupBy<K extends string, T extends Record<K, string | number>>(array: T[], key: K) {
  return array.reduce((acc: {[k: string]: T[]}, curr: T) => {
    const group = curr[key];
    const newArray = acc[group] ? [...acc[group], curr] : [curr];
    return { ...acc, [group]: newArray };
  }, {});
}
