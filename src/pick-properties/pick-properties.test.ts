import { describe, expect, it } from '@jest/globals';
import { pickProperties } from './pick-properties';

describe('pickProperties', () => {
  it('returns a new object with only specified properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pickProperties(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('ignores properties not in the object', () => {
    const obj = { a: 1 };
    expect(pickProperties(obj, ['a', 'b'])).toEqual({ a: 1 });
  });

  it('returns an empty object if no properties match', () => {
    expect(pickProperties({ a: 1 }, ['b'])).toEqual({});
  });
});
