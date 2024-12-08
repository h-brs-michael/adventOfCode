import { readGridFromFile } from '../helper';

async function main() {
  const path = './src/24_06/input.txt';
  const grid = readGridFromFile(path);

  console.log({ grid });

  const count = findStepCount(grid);

  console.log({ count });
}

type Direction = 'UP' | 'RIGHT' | 'LEFT' | 'DOWN';

function findStepCount(grid: string[][]) {
  const rows = grid.length;
  const cols = grid[0].length;

  let startingPosition: number[] = [];
  let direction: Direction = 'UP';
  let nextPosition: number[] = [];
  // Traverse the grid

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '^') {
        startingPosition = [r, c];
        nextPosition = [r - 1, c];
      }
    }
  }

  console.log({ startingPosition });

  function isNextFieldFree(position: number[]): boolean {
    const [r, c] = position;

    switch (direction) {
      case 'UP':
        if (r - 1 > 0) {
          if (grid[r - 1][c] === '#') {
            // turn right
            // return false;
            direction = 'RIGHT';
            return isNextFieldFree(position);
          } else {
            nextPosition = [r - 1, c];
            return true;
          }
        }
        return false;
      case 'DOWN':
        // return r + 1 < rows;
        if (r + 1 < rows) {
          if (grid[r + 1][c] === '#') {
            // turn right
            // return false;
            direction = 'LEFT';
            return isNextFieldFree(position);
          } else {
            nextPosition = [r + 1, c];
            return true;
          }
        }
        return false;
      case 'LEFT':
        // return c - 1 > 0;
        if (c - 1 > 0) {
          if (grid[r][c - 1] === '#') {
            // turn right
            // return false;
            direction = 'UP';
            return isNextFieldFree(position);
          } else {
            nextPosition = [r, c - 1];
            return true;
          }
        }
        return false;
      case 'RIGHT':
        // return c + 1 < rows;
        if (c + 1 < cols) {
          if (grid[r][c + 1] === '#') {
            // turn right
            // return false;
            direction = 'DOWN';
            return isNextFieldFree(position);
          } else {
            nextPosition = [r, c + 1];
            return true;
          }
        }
        return false;
    }
  }

  while (isNextFieldFree(startingPosition)) {
    const [currentR, currentC] = startingPosition;
    grid[currentR][currentC] = 'X';
    // go there
    const [nextR, nextC] = nextPosition;
    startingPosition = [nextR, nextC];
    // mark current position
    grid[nextR][nextC] = 'X';
  }

  printGrid(grid);
  console.log({ startingPosition });

  const countX = grid.flat().filter(value => value === 'X').length;

  return countX;
}

function printGrid(grid: string[][]) {
  for (const row of grid) {
    console.log(row.join(' '));
  }
}

main();
