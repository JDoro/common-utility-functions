/**
 * Takes a function that accepts multiple arguments and returns a new function that only accepts one argument.
 * @param fn - The function to convert to unary
 * @returns {function(x):x} a new function that only accepts one argument}
 */
function unary(fn) {
  return function(a) {
    return fn(a);
  };
}
