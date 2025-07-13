import { describe, it, expect } from '@jest/globals';
import { wrapSlice } from './wrap-slice';

describe('wrapSlice', () => {
  it('returns a slice within bounds', () => {
    expect(wrapSlice([1, 2, 3, 4], 1, 2)).toEqual([2, 3]);
  });

  it('wraps around the array if endIndex exceeds length', () => {
    expect(wrapSlice([1, 2, 3], 2, 4)).toEqual([3, 1, 2]);
  });

  it('handles negative indices', () => {
    expect(wrapSlice([1, 2, 3], -2, 1)).toEqual([2, 3, 1, 2]);
  });

  it('returns empty array if startIndex > endIndex', () => {
    expect(wrapSlice([1, 2, 3], 3, 2)).toEqual([]);
  });

  it('returns empty array for empty input array', () => {
    expect(wrapSlice([], 0, 2)).toEqual([]);
    expect(wrapSlice([], -1, 1)).toEqual([]);
  });
});

