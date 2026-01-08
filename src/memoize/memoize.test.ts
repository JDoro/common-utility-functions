import { memoize } from './memoize';

describe('memoize', () => {
  it('should call the function only once for the same arguments', () => {
    const func = jest.fn();
    const memoizedFunc = memoize(func);
    const obj = {};
    const arr: any[] = [];

    memoizedFunc(1, 'hello', obj, arr);
    memoizedFunc(1, 'hello', obj, arr);
    memoizedFunc(1, 'hello', obj, arr);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should return the cached result for subsequent calls with the same arguments', () => {
    const func = jest.fn((a: number, b: number) => a + b);
    const memoizedFunc = memoize(func);

    const result1 = memoizedFunc(2, 3);
    const result2 = memoizedFunc(2, 3);

    expect(result1).toBe(5);
    expect(result2).toBe(5);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function again for different arguments', () => {
    const func = jest.fn();
    const memoizedFunc = memoize(func);
    const obj1 = {};
    const obj2 = {};

    memoizedFunc(1);
    memoizedFunc(2);
    memoizedFunc(1);
    memoizedFunc(obj1);
    memoizedFunc(obj2);
    memoizedFunc(obj1);

    expect(func).toHaveBeenCalledTimes(4);
  });

  it('should work with functions that return objects', () => {
    const func = jest.fn((a: number) => ({ value: a }));
    const memoizedFunc = memoize(func);

    const result1 = memoizedFunc(1);
    const result2 = memoizedFunc(1);

    expect(result1).toEqual({ value: 1 });
    expect(result2).toBe(result1); // Should return the exact same object
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should work with functions that take objects as arguments', () => {
    const func = jest.fn((obj: { a: number }) => obj.a * 2);
    const memoizedFunc = memoize(func);
    const obj = { a: 1 };

    memoizedFunc(obj);
    memoizedFunc(obj);
    memoizedFunc({ a: 1 });

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should differentiate between objects with undefined properties', () => {
    const func = jest.fn((obj: any) => obj.a);
    const memoizedFunc = memoize(func);
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: undefined };

    memoizedFunc(obj1);
    memoizedFunc(obj2);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should work with functions with no arguments', () => {
    const func = jest.fn(() => 42);
    const memoizedFunc = memoize(func);

    memoizedFunc();
    memoizedFunc();

    expect(func).toHaveBeenCalledTimes(1);
    expect(memoizedFunc()).toBe(42);
  });

  it('should re-throw errors and not cache them', () => {
    const error = new Error('test error');
    let callCount = 0;
    const func = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount <= 2) {
        throw error;
      }
      return 'success';
    });

    const memoizedFunc = memoize(func);

    expect(() => memoizedFunc()).toThrow('test error');
    expect(() => memoizedFunc()).toThrow('test error');

    // After the errors, the function should not be cached as a throwing function
    expect(memoizedFunc()).toBe('success');
    expect(memoizedFunc()).toBe('success');

    expect(func).toHaveBeenCalledTimes(3);
  });
});
