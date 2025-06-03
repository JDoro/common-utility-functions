import { describe, it, expect } from '@jest/globals';
import { getProp } from "./get-prop";

describe('getProp', () => {
  it('gets a top-level property', () => {
    const obj = { a: 1 };
    expect(getProp('a')(obj)).toBe(1);
  });

  it('gets a nested property', () => {
    const obj = { a: { b: 2 } };
    expect(getProp('a.b')(obj)).toBe(2);
  });

  it('returns undefined for missing property', () => {
    const obj = { a: 1 };
    expect(getProp('b')(obj)).toBeUndefined();
  });
});

