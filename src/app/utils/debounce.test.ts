import { debounce } from "./debounce";

describe("debounce", () => {
  jest.useFakeTimers(); // Use fake timers for testing debouncing

  it("should call the function after the specified wait time", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    expect(mockFn).not.toBeCalled(); // Should not be called immediately

    jest.advanceTimersByTime(100); // Fast-forward the timers
    expect(mockFn).toBeCalledTimes(1); // Should be called once
  });

  it("should not call the function if debounced multiple times", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn(); // Call multiple times

    expect(mockFn).not.toBeCalled(); // Should not be called immediately

    jest.advanceTimersByTime(100); // Fast-forward the timers
    expect(mockFn).toBeCalledTimes(1); // Should be called only once
  });

  it("should pass the correct arguments to the debounced function", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn("arg1", "arg2");

    jest.advanceTimersByTime(100); // Fast-forward the timers
    expect(mockFn).toBeCalledWith("arg1", "arg2"); // Should be called with the correct arguments
  });

  it("should reset the timer on subsequent calls", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50); // Fast-forward partway
    debouncedFn(); // Call again before 100ms is up

    jest.advanceTimersByTime(100); // Fast-forward to the end
    expect(mockFn).toBeCalledTimes(1); // Should still be called only once
  });
});
