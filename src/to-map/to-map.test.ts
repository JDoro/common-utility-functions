import { describe, it, expect } from '@jest/globals';
import { toMap } from './to-map';

describe('toMap', () => {
  it('converts array to map using key', () => {
    const arr = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 }
    ];
    expect(toMap(arr, 'id')).toEqual({
      a: { id: 'a', value: 1 },
      b: { id: 'b', value: 2 }
    });
  });

  it('overwrites duplicate keys', () => {
    const arr = [
      { id: 'a', value: 1 },
      { id: 'a', value: 2 }
    ];
    expect(toMap(arr, 'id')).toEqual({
      a: { id: 'a', value: 2 }
    });
  });

  it('returns empty object for empty array', () => {
    expect(toMap([], 'id')).toEqual({});
  });
});

