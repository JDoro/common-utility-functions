import {describe, expect, it} from '@jest/globals';
import {unary} from "./unary";

describe('unary', () => {
  it('returns a function that only accepts one argument', () => {
    const add = (a: number, b: number) => a + b;
    const unaryAdd = unary(add);
    expect(unaryAdd(2)).toBe(NaN); // b is undefined
  });

  it('works with single-argument functions', () => {
    const double = (x: number) => x * 2;
    const unaryDouble = unary(double);
    expect(unaryDouble(3)).toBe(6);
  });
});

