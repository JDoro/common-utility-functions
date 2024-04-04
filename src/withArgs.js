/**
 * Returns a function that takes a function and calls it with the provided arguments
 * @param args - The arguments to be passed to the second function
 * @returns {function(*): *} a new function that takes a function and calls it with the provided arguments
 */
function withArgs(...args) {
    return function(func) {
        return func(...args);
    }
}
