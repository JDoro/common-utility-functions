/**
 * Returns a function that takes a function and calls it with the provided arguments
 * @param args - The arguments to be passed to the second function
 * @returns {function(*): *} a new function that takes a function and calls it with the provided arguments
 */
export function withArgs<Args extends unknown[], R>(...args: Args): (func: (...args: Args) => R) => R {
    return function(func: (...args: Args) => R): R {
        return func(...args);
    }
}
