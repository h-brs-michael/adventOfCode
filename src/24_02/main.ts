import { readFile } from "../helper";

async function main() {
  const path = "./src/24_02/input.txt";

  const reports = await readFile(path, true);

  const safeReports = reports.filter((report) => {
    const level = report.split(" ");
    const levenNumber = level.map((level) => Number.parseInt(level));

    return isSafe(levenNumber);
  });

  console.log({ safeReports: safeReports.length });

  // 398
  const canBeMadeSafeRepoprts = reports.filter((report) => {
    const level = report.split(" ");
    const levenNumber = level.map((level) => Number.parseInt(level));

    return isSafe(levenNumber) || canBeMadeSafe(levenNumber);
  });

  console.log({ canBeMadeSafeRepoprts: canBeMadeSafeRepoprts.length });
}

function isSafe(level: number[]) {
  const isIncreasing = isIncreasingF(level);
  const isDecreasing = isDecreasingF(level);
  return isIncreasing || isDecreasing;
}

function isDecreasingF(level: number[]) {
  return level.reduce<boolean>((accummulator, current, index, array) => {
    if (!accummulator) {
      return false;
    }
    if (index === 0) {
      return true;
    }
    const prev = array[index - 1];
    return prev - current >= 1 && prev - current <= 3;
  }, true);
}

function isIncreasingF(level: number[]) {
  return level.reduce<boolean>((accummulator, current, index, array) => {
    if (!accummulator) {
      return false;
    }
    if (index === 0) {
      return true;
    }
    const prev = array[index - 1];
    return current - prev >= 1 && current - prev <= 3;
  }, true);
}

function canBeMadeSafe(levels: number[]): boolean {
  for (let i = 0; i < levels.length; i++) {
    // Create a copy of levels excluding the i-th element
    // const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));

    // remove i from array
    // const modifiedLevels = levels.filter((_, index) => index !== i);

    // if (isSafe(modifiedLevels)) {
    //   return true;
    // }

    // remove ith element from array but mutate the array
    const copy = [...levels];
    copy.splice(i, 1);
    if (isSafe(copy)) {
      return true;
    }
  }
  return false;
}

main();
