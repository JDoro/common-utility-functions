import { throttle } from './throttle';

jest.useFakeTimers();

describe('throttle', () => {
  let func: jest.Mock;

  beforeEach(() => {
    func = jest.fn();
  });

  it('should call the function immediately on the first call', () => {
    const throttled = throttle(func, 100);
    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function again within the time limit', () => {
    const throttled = throttle(func, 100);
    throttled();
    throttled();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function again after the time limit has passed', () => {
    const throttled = throttle(func, 100);
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    throttled();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments to the original function', () => {
    const throttled = throttle(func, 100);
    throttled(1, 'test');
    expect(func).toHaveBeenCalledWith(1, 'test');
  });

  it('should use the latest arguments for the trailing call', () => {
    const throttled = throttle(func, 100);
    throttled(1);
    throttled(2);
    throttled(3);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(1);

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith(3);
  });

  it('should handle trailing invocations correctly', () => {
    const throttled = throttle(func, 100);
    throttled(); // Called immediately
    expect(func).toHaveBeenCalledTimes(1);

    throttled(); // Throttled
    jest.advanceTimersByTime(50);
    throttled(); // Throttled

    jest.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(2); // Trailing call
  });

  it('cancel should prevent a pending invocation', () => {
    const throttled = throttle(func, 100);
    throttled();
    throttled();

    throttled.cancel();
    jest.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('flush should immediately invoke a pending function', () => {
    const throttled = throttle(func, 100);
    throttled(1);
    throttled(2);

    const result = throttled.flush();
    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith(2);
    expect(result).toBe(func.mock.results[1].value);
  });

  it('should correctly apply the context of `this`', () => {
    const obj = {
      func: jest.fn(),
      throttledMethod: throttle(function(this: any) { this.func() }, 100)
    };

    obj.throttledMethod();
    expect(obj.func).toHaveBeenCalledTimes(1);
  });

  it('should return the result of the last actual invocation', () => {
    let counter = 0;
    const funcWithReturn = jest.fn().mockImplementation(() => ++counter);
    const throttled = throttle(funcWithReturn, 100);

    const result1 = throttled();
    expect(result1).toBe(1);

    const result2 = throttled();
    expect(result2).toBe(1); // Still the result from the first call

    jest.advanceTimersByTime(100);
    const result3 = throttled();
    expect(result3).toBe(2);
  });
});
