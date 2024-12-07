import { readFile } from '../helper';

type RuleSet = { first: string; second: string };
type RuleSetNumber = { first: number; second: number };

async function main() {
  const path = './src/24_05/input.txt';
  const lines = await readFile(path);

  const { pageRules, pageUpdates } = getRulesAndUpdates(lines);
  console.log({ pageRules });

  const ruleSets: RuleSet[] = pageRules.map((rule) => {
    const [first, second] = rule.split('|');
    return { first, second };
  });

  function isCorrectUpdate(update: string): boolean {
    for (const rule of ruleSets) {
      const { first, second } = rule;
      const firstIndex = update.indexOf(first);
      const secondIndex = update.indexOf(second);
      if (firstIndex > 0 && secondIndex > 0) {
        if (firstIndex > secondIndex) {
          return false;
        }
      }
    }
    return true;
  }

  const correctUpdates = pageUpdates.filter(isCorrectUpdate);

  const correctUpdateNumbers = correctUpdates.map((update) =>
    update.split(',').map((n) => Number.parseInt(n))
  );
  const correctUpdateMiddlePages = correctUpdateNumbers.map((update) => {
    const length = update.length;
    const middle = Math.floor(length / 2);
    return update[middle];
  });
  console.log({ correctUpdateMiddlePages });

  const sum = correctUpdateMiddlePages.reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  console.log({ sum });
  // 4578

  const nonCorrectUpdates = pageUpdates.filter((u) => !isCorrectUpdate(u));
  const nonCorrectUpdateNumbers = nonCorrectUpdates.map((update) =>
    update.split(',').map((n) => Number.parseInt(n))
  );
  const ruleSetNumbers = ruleSets.map((rS) => ({
    first: Number.parseInt(rS.first),
    second: Number.parseInt(rS.second),
  }));

  /** 
    compareFn?: (a: T, b: T) => number
    A negative value indicates that a should come before b.
    A positive value indicates that a should come after b.
    Zero or NaN indicates that a and b are considered equal.
  * */
  function sortByRules(a: number, b: number) {
    const ruleAFirst = ruleSetNumbers.find(
      ({ first, second }) => first === a && second === b
    );
    const ruleBFirst = ruleSetNumbers.find(
      ({ first, second }) => first === b && second === a
    );
    if (ruleAFirst) {
      return -1;
    }
    if (ruleBFirst) {
      return 1;
    }
    return 0;
  }

  const ordered = nonCorrectUpdateNumbers.map((update) =>
    update.toSorted(sortByRules)
  );
  const orderedMiddlePages = ordered.map((update) => {
    const length = update.length;
    const middle = Math.floor(length / 2);
    return update[middle];
  });

  const sumOrdered = orderedMiddlePages.reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  console.log({ sumOrdered });
  // 6179
}

function getRulesAndUpdates(lines: string[]): {
  pageRules: string[];
  pageUpdates: string[];
} {
  const pageRules: string[] = [],
    pageUpdates: string[] = [];

  for (const l of lines) {
    if (l.includes('|')) {
      pageRules.push(l);
    } else if (l.includes(',')) {
      pageUpdates.push(l);
    }
  }

  return { pageRules, pageUpdates };
}

main();
