import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the function only once after the delay', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should pass the arguments to the debounced function', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc(1, 'hello');

    jest.advanceTimersByTime(500);

    expect(func).toHaveBeenCalledWith(1, 'hello');
  });

  it('should reset the timeout if called again within the delay period', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 500);

    debouncedFunc();
    jest.advanceTimersByTime(250);
    debouncedFunc();
    jest.advanceTimersByTime(250);
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should call the function immediately with zero delay', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 0);

    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(0);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle negative delay values by treating them as zero', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, -100);

    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    jest.advanceTimersByTime(0);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle errors thrown by the debounced function', () => {
    const errorFunc = jest.fn(() => {
      throw new Error('Test error');
    });
    const debouncedFunc = debounce(errorFunc, 500);

    debouncedFunc();

    expect(() => {
      jest.advanceTimersByTime(500);
    }).toThrow('Test error');

    expect(errorFunc).toHaveBeenCalledTimes(1);
  });
});
