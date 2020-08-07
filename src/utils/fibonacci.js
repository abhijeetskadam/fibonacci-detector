const FIBONACCI_NUMBERS = {};

function populateFibonacciNumbers() {
  let previous = 1;
  let current = 1;
  for (let i = 1; i < 100; i++) {
    FIBONACCI_NUMBERS[current] = true;
    [previous, current] = [current, previous + current];
  }
}

populateFibonacciNumbers();
console.log(FIBONACCI_NUMBERS);

export function isFibonacciNumber(number) {
  return !!FIBONACCI_NUMBERS[number];
}
