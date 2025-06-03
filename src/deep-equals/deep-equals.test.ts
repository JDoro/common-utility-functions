import { describe, it, expect } from '@jest/globals';
import { deepEquals } from "./deep-equals";

describe('deepEquals', () => {
  it('returns true for identical primitives', () => {
    expect(deepEquals(1, 1)).toBe(true);
    expect(deepEquals('a', 'a')).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(deepEquals(1, 2)).toBe(false);
    expect(deepEquals('a', 'b')).toBe(false);
  });

  it('returns true for deeply equal objects', () => {
    expect(deepEquals({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  it('returns false for objects with different keys or values', () => {
    expect(deepEquals({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepEquals({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns false for null vs object', () => {
    expect(deepEquals(null, {})).toBe(false);
    expect(deepEquals({}, null)).toBe(false);
  });
});

