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

  it('should resolve the promise with the return value of the original function', async () => {
    const func = jest.fn().mockReturnValue('test value');
    const debouncedFunc = debounce(func, 500);

    const promise = debouncedFunc();

    jest.advanceTimersByTime(500);

    await expect(promise).resolves.toBe('test value');
  });

  it('should resolve all promises with the return value of the last invocation', async () => {
    const func = jest.fn().mockImplementation((val) => val);
    const debouncedFunc = debounce(func, 500);

    const promise1 = debouncedFunc('first');
    const promise2 = debouncedFunc('second');
    const promise3 = debouncedFunc('third');

    jest.advanceTimersByTime(500);

    await expect(promise1).resolves.toBe('third');
    await expect(promise2).resolves.toBe('third');
    await expect(promise3).resolves.toBe('third');
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('third');
  });

  it('should reject the promise if the original function throws an error', async () => {
    const error = new Error('test error');
    const func = jest.fn().mockImplementation(() => {
      throw error;
    });
    const debouncedFunc = debounce(func, 500);

    const promise = debouncedFunc();

    jest.advanceTimersByTime(500);

    await expect(promise).rejects.toThrow('test error');
  });

  it('should reject all promises if the final invocation throws an error', async () => {
    const error = new Error('final error');
    const func = jest.fn().mockImplementation((val) => {
      if (val === 'third') {
        throw error;
      }
      return val;
    });
    const debouncedFunc = debounce(func, 500);

    const promise1 = debouncedFunc('first');
    const promise2 = debouncedFunc('second');
    const promise3 = debouncedFunc('third');

    jest.advanceTimersByTime(500);

    await expect(promise1).rejects.toThrow('final error');
    await expect(promise2).rejects.toThrow('final error');
    await expect(promise3).rejects.toThrow('final error');
  });

  it('should resolve with the value of an async function', async () => {
    const func = jest.fn().mockResolvedValue('async value');
    const debouncedFunc = debounce(func, 500);

    const promise = debouncedFunc();

    jest.advanceTimersByTime(500);

    await expect(promise).resolves.toBe('async value');
  });

  it('should reject if an async function rejects', async () => {
    const error = new Error('async error');
    const func = jest.fn().mockRejectedValue(error);
    const debouncedFunc = debounce(func, 500);

    const promise = debouncedFunc();

    jest.advanceTimersByTime(500);

    await expect(promise).rejects.toThrow('async error');
  });
});
