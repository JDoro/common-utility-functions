import { describe, it, expect } from '@jest/globals';
import { groupBy } from "./group-by";

describe('groupBy', () => {
  it('groups objects by a key', () => {
    const arr = [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
      { type: 'vegetable', name: 'carrot' }
    ];
    expect(groupBy(arr, 'type')).toEqual({
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' }
      ],
      vegetable: [
        { type: 'vegetable', name: 'carrot' }
      ]
    });
  });

  it('returns empty object for empty array', () => {
    expect(groupBy([], 'type')).toEqual({});
  });
});

