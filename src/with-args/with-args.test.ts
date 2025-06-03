import {describe, expect, it} from '@jest/globals';
import {withArgs} from './with-args';


// Test cases
describe('withArgs', () => {
  it('calls a function with provided arguments', () => {
    const add = (a: number, b: number) => a + b;
    const callWith = withArgs(2, 3);
    expect(callWith(add)).toBe(5);
  });

  it('works with no arguments', () => {
    const fn = () => 42;
    const callWith = withArgs();
    expect(callWith(fn)).toBe(42);
  });

  it('works with string arguments', () => {
    const concat = (a: string, b: string) => a + b;
    const callWith = withArgs('foo', 'bar');
    expect(callWith(concat)).toBe('foobar');
  });
});

