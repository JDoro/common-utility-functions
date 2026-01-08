import { throttle } from './throttle';

describe('throttle', () => {
  jest.useFakeTimers();

  it('should call the function immediately on the first call', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should not call the function again within the limit', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function again after the limit has passed', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    throttled();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('should pass the arguments to the original function', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled(1, 'test');
    expect(func).toHaveBeenCalledWith(1, 'test');
  });

  it('should use the latest arguments when calling the trailing invocation', () => {
    const func = jest.fn();
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

  it('should not have a trailing call if the function was not called during the throttle period', () => {
    const func = jest.fn();
    const throttled = throttle(func, 100);

    throttled(1);
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  describe('cancel', () => {
    it('should prevent the trailing invocation', () => {
      const func = jest.fn();
      const throttled = throttle(func, 100);

      throttled(1);
      throttled(2);
      throttled.cancel();

      jest.advanceTimersByTime(100);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('flush', () => {
    it('should immediately invoke the function with the last arguments', () => {
      const func = jest.fn();
      const throttled = throttle(func, 100);

      throttled(1);
      throttled(2);
      throttled.flush();

      expect(func).toHaveBeenCalledTimes(2);
      expect(func).toHaveBeenCalledWith(2);
    });

    it('should not do anything if there is no pending invocation', () => {
        const func = jest.fn();
        const throttled = throttle(func, 100);

        throttled(1);
        expect(func).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(100);
        throttled.flush();
        expect(func).toHaveBeenCalledTimes(1);
      });
  });
});
