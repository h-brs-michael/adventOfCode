import { readFile } from '../helper';

async function main() {
  const path = './src/24_07/input.txt';
  const lines = await readFile(path);

  console.log(lines);

  let equasionResults: number[] = [];
  let numbers: number[][] = [];
  lines.forEach((line) => {
    const [resultStr, numbersString] = line.split(':');
    const result = Number.parseInt(resultStr);
    equasionResults.push(result);

    const numberStr = numbersString.trim().split(' ');
    const n = numberStr.map((n) => Number.parseInt(n));
    numbers.push(n);
  });

  console.log(equasionResults);
  console.log(numbers);

  const operators = ['+', '*'];

  const correctEquasions = equasionResults.filter((equasionResult, index) => {
    const n = numbers[index];
    // console.log(n);

    const numOperators = n.length - 1;

    const combinations = generateOperatorCombinationsIterative(
      operators,
      numOperators
    );
    // console.log({ combinations });

    for (const combination of combinations) {
      const combinationResult = evaluateLeftToRight(n, combination);
      console.log({ combinationResult });
      if (combinationResult === equasionResult) {
        return true;
      }
    }
    return false;
  });

  console.log({ correctEquasions });
  const sum = correctEquasions.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  console.log({ sum });
}

function generateOperatorCombinationsIterative(
  operators: string[],
  length: number
): string[][] {
  const combinations: string[][] = [];

  // Start with a single empty combination
  let currentCombinations: string[][] = [[]];

  for (let i = 0; i < length; i++) {
    const newCombinations: string[][] = [];

    for (const combination of currentCombinations) {
      for (const operator of operators) {
        newCombinations.push([...combination, operator]);
      }
    }

    currentCombinations = newCombinations;
  }

  return currentCombinations;
}

function evaluateLeftToRight(
  numbers: number[],
  operatorCombinations: string[] // one less then numbers
): number {
  let result = numbers[0];

  for (let i = 0; i < operatorCombinations.length; i++) {
    const operator = operatorCombinations[i];
    const nextNumber = numbers[i + 1];

    if (operator === '+') {
      result += nextNumber;
    } else if (operator === '*') {
      result *= nextNumber;
    }
  }

  return result;
}

main();
