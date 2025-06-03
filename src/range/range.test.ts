import { describe, it, expect } from '@jest/globals';
import { range } from './range';

describe('range', () => {
  it('returns a range from min to max inclusive', () => {
    expect(range(1, 3)).toEqual([1, 2, 3]);
  });

  it('returns a single value if min == max', () => {
    expect(range(5, 5)).toEqual([5]);
  });

  it('returns an empty array if min > max', () => {
    expect(range(3, 1)).toEqual([]);
  });
});

