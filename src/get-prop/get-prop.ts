/**
 * Creates a function that safely retrieves a nested property from an object using dot notation.
 * Returns undefined if any part of the path is undefined or null, preventing runtime errors
 * when accessing deeply nested properties.
 *
 * @param keyPath - A dot-separated string representing the path to the desired property (e.g., 'user.profile.name')
 * @returns A function that takes an object and returns the value at the specified path, or undefined if not found
 * @example
 * ```typescript
 * const user = {
 *   profile: {
 *     name: 'John',
 *     settings: {
 *       theme: 'dark'
 *     }
 *   }
 * };
 *
 * const getName = getProp('profile.name');
 * const getTheme = getProp('profile.settings.theme');
 * const getInvalid = getProp('profile.invalid.path');
 *
 * console.log(getName(user)); // 'John'
 * console.log(getTheme(user)); // 'dark'
 * console.log(getInvalid(user)); // undefined
 *
 * // Safe with undefined objects
 * console.log(getName(undefined)); // undefined
 *
 * // Useful with array methods
 * const users = [user, { profile: { name: 'Jane' } }];
 * const names = users.map(getName); // ['John', 'Jane']
 * ```
 * @since 1.0.0
 */
export function getProp<T extends Record<string, T | undefined>>(keyPath: string) {
    return function(obj: T | undefined): T | undefined {
        return keyPath
            .split('.')
            .reduce(function(currentObj: T | undefined, key: string) {
                if(!currentObj)  return;
                return currentObj[key];
            }, obj);
    }
}

