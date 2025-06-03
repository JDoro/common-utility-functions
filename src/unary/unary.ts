/**
 * Takes a function that accepts multiple arguments and returns a new function that only accepts one argument.
 * @param {function(...*): *} fn - The function to convert to unary
 * @returns {function(*):*} a new function that only accepts one argument}
 */
export function unary<A, R>(fn: (a: A, ...args: never[]) => R): (a: A) => R {
  return function(a: A): R {
    return fn(a);
  };
}
