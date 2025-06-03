import { describe, it, expect } from '@jest/globals';
import { filterStringArray } from './filter-string-array';

describe('filterStringArray', () => {
  it('filters array by substring', () => {
    expect(filterStringArray(['apple', 'banana', 'apricot'], 'ap')).toEqual(['apple', 'apricot']);
  });

  it('returns empty array if no match', () => {
    expect(filterStringArray(['apple', 'banana'], 'z')).toEqual([]);
  });

  it('returns all if filter is empty', () => {
    expect(filterStringArray(['a', 'b'], '')).toEqual(['a', 'b']);
  });
});

