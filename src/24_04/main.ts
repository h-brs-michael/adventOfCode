import assert from 'assert';
import { readGridFromFile } from '../helper';

async function main() {
  const path = './src/24_04/input.txt';

  const grid = readGridFromFile(path);

  const count = findXmasOccurrences(grid);
  console.log({ count });
  // 2464

  const countXMAS = findXmasPattern(grid);
  console.log({ countXMAS });
  // 453 in too low
  // 963 MAS & SAM is too low
}

function findXmasOccurrences(grid: string[][]): number {
  const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [1, 1], // Down-Right
    [1, -1], // Down-Left
    [-1, 1], // Up-Right
    [-1, -1], // Up-Left
  ];

  const word = 'XMAS';
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(x: number, y: number): boolean {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  }

  function checkDirection(x: number, y: number, dx: number, dy: number): boolean {
    for (let i = 0; i < word.length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (!isValid(nx, ny) || grid[nx][ny] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 'X') {
        // Start matching from 'X'
        for (const [dx, dy] of directions) {
          if (checkDirection(r, c, dx, dy)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

/**
    M . S
    . A .
    M . S
 */
function findXmasPattern(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // Function to check for X-MAS pattern at (r, c)
  function isXmas(r: number, c: number): boolean {
    // Ensure all required positions are within bounds
    if (
      r - 1 >= 0 &&
      c - 1 >= 0 && // Top-left
      r + 1 < rows &&
      c + 1 < cols && // Bottom-right
      r - 1 >= 0 &&
      c + 1 < cols && // Top-right
      r + 1 < rows &&
      c - 1 >= 0 // Bottom-left
    ) {
      // Check the X-MAS pattern
      // Check all combinations of diagonals
      const tlbrMAS = grid[r - 1][c - 1] === 'M' && grid[r][c] === 'A' && grid[r + 1][c + 1] === 'S';

      const tlbrSAM = grid[r - 1][c - 1] === 'S' && grid[r][c] === 'A' && grid[r + 1][c + 1] === 'M';

      const trblMAS = grid[r - 1][c + 1] === 'M' && grid[r][c] === 'A' && grid[r + 1][c - 1] === 'S';

      const trblSAM = grid[r - 1][c + 1] === 'S' && grid[r][c] === 'A' && grid[r + 1][c - 1] === 'M';

      // Return true if any valid combination exists
      return (
        (tlbrMAS && trblMAS) || // Both diagonals are MAS
        (tlbrMAS && trblSAM) || // TL-BR is MAS, TR-BL is SAM
        (tlbrSAM && trblMAS) || // TL-BR is SAM, TR-BL is MAS
        (tlbrSAM && trblSAM) // Both diagonals are SAM
      );
    }
    return false;
  }

  // Traverse the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isXmas(r, c)) {
        count++;
      }
    }
  }

  return count;
}

main();
