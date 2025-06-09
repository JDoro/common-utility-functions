/**
 * Creates a function that applies a set of predefined arguments to any function passed to it.
 * This is useful for partial application scenarios where you want to fix certain arguments
 * and apply them to different functions, or for creating reusable argument configurations.
 *
 * @param args - The arguments to be passed to any function that gets called
 * @returns A function that takes another function and calls it with the predefined arguments
 * @example
 * ```typescript
 * // Create a function that always calls with specific arguments
 * const callWithUserData = withArgs('John', 25, 'Engineer');
 *
 * function greetUser(name: string, age: number, job: string) {
 *   return `Hello ${name}, age ${age}, working as ${job}`;
 * }
 *
 * function logUser(name: string, age: number, job: string) {
 *   console.log(`User: ${name}, ${age}, ${job}`);
 * }
 *
 * // Apply the same arguments to different functions
 * const greeting = callWithUserData(greetUser);
 * // Result: "Hello John, age 25, working as Engineer"
 *
 * callWithUserData(logUser);
 * // Logs: "User: John, 25, Engineer"
 *
 * // Useful for array operations with consistent arguments
 * const mathOperations = [
 *   (a: number, b: number) => a + b,
 *   (a: number, b: number) => a * b,
 *   (a: number, b: number) => a - b
 * ];
 *
 * const applyNumbers = withArgs(10, 5);
 * const results = mathOperations.map(applyNumbers);
 * // Results: [15, 50, 5]
 * ```
 * @since 1.0.0
 */
export function withArgs<Args extends unknown[], R>(...args: Args): (func: (...args: Args) => R) => R {
    return function(func: (...args: Args) => R): R {
        return func(...args);
    }
}
