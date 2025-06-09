/**
 * Converts a function that accepts multiple arguments into a unary function (accepting only one argument).
 * This is particularly useful when working with array methods like map, filter, or forEach where
 * you want to prevent a function from receiving additional arguments that these methods provide
 * (like index and array parameters).
 *
 * @param fn - The function to convert to unary (must accept at least one argument)
 * @returns A new function that accepts only the first argument and ignores any additional arguments
 * @example
 * ```typescript
 * // Problem: parseInt receives index as second argument from map
 * ['1', '2', '3'].map(parseInt); // [1, NaN, NaN] - unexpected!
 *
 * // Solution: Use unary to limit parseInt to one argument
 * ['1', '2', '3'].map(unary(parseInt)); // [1, 2, 3] - correct!
 *
 * // Custom function example
 * function greet(name: string, title?: string) {
 *   return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
 * }
 *
 * const names = ['Alice', 'Bob', 'Charlie'];
 *
 * // Without unary - title gets set to array index
 * names.map(greet); // ['Hello, Alice', 'Hello, 1 Bob', 'Hello, 2 Charlie']
 *
 * // With unary - only name is passed
 * names.map(unary(greet)); // ['Hello, Alice', 'Hello, Bob', 'Hello, Charlie']
 *
 * // Another example with Math functions
 * const numbers = ['10.5', '20.7', '30.9'];
 * numbers.map(unary(parseFloat)); // [10.5, 20.7, 30.9]
 * ```
 * @since 1.0.0
 */
export function unary<A, R>(fn: (a: A, ...args: never[]) => R): (a: A) => R {
  return function(a: A): R {
    return fn(a);
  };
}
