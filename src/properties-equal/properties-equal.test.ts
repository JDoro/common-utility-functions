import { describe, it, expect } from '@jest/globals';
import { propertiesEqual } from './properties-equal';

describe('propertiesEqual', () => {
  it('returns true if specified properties are equal', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(propertiesEqual(obj1, obj2, ['a'])).toBe(true);
  });

  it('returns false if specified properties are not equal', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 2 };
    expect(propertiesEqual(obj1, obj2, ['a'])).toBe(false);
  });

  it('returns true for empty properties array', () => {
    expect(propertiesEqual({ a: 1 }, { a: 2 }, [])).toBe(true);
  });
});

