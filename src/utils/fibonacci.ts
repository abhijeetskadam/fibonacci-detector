const FIBONACCI_NUMBERS: any = {};

// assuming that for this application first 100 fibonacci numbers are enough
function populateFibonacciNumbers(): void {
  let previous = 1;
  let current = 1;
  for (let i = 1; i < 100; i++) {
    FIBONACCI_NUMBERS[current] = true;
    [previous, current] = [current, previous + current];
  }
}

populateFibonacciNumbers();

export function isFibonacciNumber(numberToVerify: number): boolean {
  return !!FIBONACCI_NUMBERS[numberToVerify];
}

export function isFibonacciSequence(sequence: Array<number> = []): boolean {
  if (sequence.length < 3)
    throw Error("Sequence should have at least 3 numbers");

  let [previous, current, ...restSequence] = sequence;

  if (!isFibonacciNumber(previous) || !isFibonacciNumber(current)) {
    return false;
  }

  for (let i = 0; i < restSequence.length; i++) {
    const next = restSequence[i];
    if (next !== previous + current) return false;
    [previous, current] = [current, next];
  }

  return true;
}
