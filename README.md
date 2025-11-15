# Common Utility Functions

A collection of common utility functions written in TypeScript.

## Installation

To use this project, install the dependencies using npm:

```bash
npm install
```

## Usage

You can import the utility functions in your project like this:

```typescript
import { deepEquals } from 'common-utility-functions';

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

console.log(deepEquals(obj1, obj2)); // true
```

## Scripts

This project includes the following scripts:

- `npm test`: Runs the test suite.
- `npm run lint`: Lints the code to check for style errors.
- `npm run build:docs`: Generates documentation for the project.

## Available Functions

### `constant<T>(x: T): () => T`

Creates a function that always returns the same constant value.

### `deepEquals(obj1: unknown, obj2: unknown): boolean`

Performs a deep equality comparison between two values.

### `filterStringArray(array: string[], filter: string): string[]`

Filters an array of strings to include only those that contain the specified substring.

### `getProp<T extends Record<string, T | undefined>>(keyPath: string)`

Creates a function that safely retrieves a nested property from an object using dot notation.

### `groupBy<K extends string, T extends Record<K, string | number>>(array: T[], key: K)`

Groups an array of objects by the value of a specified property.

### `pickProperties<K extends string, T extends Record<K | string, unknown>>(obj: T, properties: K[]): Partial<T>`

Creates a new object containing only the specified properties from the source object.

### `propertiesEqual<K extends string, T extends Record<K, T | string | number | undefined | null>>(obj1: T, obj2: T, properties: string[]): boolean`

Compares two objects for equality based only on specified properties.

### `range(min: number, max: number): number[]`

Generates an array of consecutive integers within a specified range.

### `toMap<K extends string, T extends Record<K, string>>(array: T[], key: K): {[k: string]: T}`

Converts an array of objects into a key-value map using a specified property as the key.

### `unary<A, R>(fn: (a: A, ...args: never[]) => R): (a: A) => R`

Converts a function that accepts multiple arguments into a unary function (accepting only one argument).

### `withArgs<Args extends unknown[], R>(...args: Args): (func: (...args: Args) => R) => R`

Creates a function that applies a set of predefined arguments to any function passed to it.

### `wrapSlice<T>(arr: T[], startIndex: number, endIndex: number): T[]`

Creates a slice of an array with wrapping behavior for indices that exceed array bounds.
