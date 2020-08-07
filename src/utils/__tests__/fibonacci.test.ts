import { isFibonacciNumber, isFibonacciSequence } from "../fibonacci";

test("isFibonacciNumber works", () => {
  expect(isFibonacciNumber(1)).toBe(true);
  expect(isFibonacciNumber(2)).toBe(true);
  expect(isFibonacciNumber(7)).toBe(false);
  expect(isFibonacciNumber(13)).toBe(true);
  expect(isFibonacciNumber(50)).toBe(false);
  expect(isFibonacciNumber(55)).toBe(true);
  expect(isFibonacciNumber(100)).toBe(false);
  expect(isFibonacciNumber(144)).toBe(true);
  expect(isFibonacciNumber(500)).toBe(false);
  expect(isFibonacciNumber(610)).toBe(true);
  expect(isFibonacciNumber(1000)).toBe(false);
  expect(isFibonacciNumber(6765)).toBe(true);
});

test("isFibonacciSequence throws an error provided invalid input", () => {
  expect(() => isFibonacciSequence([])).toThrow(
    "Sequence should have at least 3 numbers"
  );
  expect(() => isFibonacciSequence([1])).toThrow(
    "Sequence should have at least 3 numbers"
  );
  expect(() => isFibonacciSequence([1, 2])).toThrow(
    "Sequence should have at least 3 numbers"
  );
});

test("isFibonacciSequence works", () => {
  expect(isFibonacciSequence([1, 1, 2, 3, 5])).toBe(true);
  expect(isFibonacciSequence([1, 1, 3, 4, 5])).toBe(false);
  expect(isFibonacciSequence([3, 5, 8, 13, 21, 34, 55, 89])).toBe(true);
  expect(isFibonacciSequence([377, 610, 987, 1598, 2584])).toBe(false);
  expect(isFibonacciSequence([377, 610, 987, 1597, 2584])).toBe(true);
});
