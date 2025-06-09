/**
 * Creates a function that always returns the same constant value.
 * This is useful for functional programming patterns where you need a function
 * that ignores its arguments and always returns a predetermined value.
 *
 * @param x - The value to be returned by the generated function
 * @returns A function that takes no arguments and always returns the provided value
 * @example
 * ```typescript
 * const alwaysFive = constant(5);
 * console.log(alwaysFive()); // 5
 * console.log(alwaysFive()); // 5
 *
 * const alwaysUser = constant({ name: 'John', age: 30 });
 * console.log(alwaysUser()); // { name: 'John', age: 30 }
 *
 * // Useful with array methods
 * const numbers = [1, 2, 3];
 * const defaults = numbers.map(constant('default')); // ['default', 'default', 'default']
 * ```
 * @since 1.0.0
 */
export function constant<T>(x: T): () => T {
  return function() {
    return x;
  };
}

