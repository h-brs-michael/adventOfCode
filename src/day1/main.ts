console.log("main");

import * as fs from "fs";
import * as readline from "readline";

// Pfad zur Datei
const dateiPfad = "./src/day1/input.txt";

function findFirstDigit(input: string): string | null {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    // Check if the character is a digit
    if (char >= "0" && char <= "9") {
      return char;
    }
  }
  // Return null if no digit is found
  return null;
}

function findLastDigit(input: string): string | null {
  for (let i = input.length - 1; i >= 0; i--) {
    const char = input[i];
    // Check if the character is a digit
    if (char >= "0" && char <= "9") {
      return char;
    }
  }
  // Return null if no digit is found
  return null;
}

async function leseZeilen(dateiPfad: string): Promise<void> {
  try {
    // Lese-Stream mit Typen
    const leseStream: fs.ReadStream = fs.createReadStream(dateiPfad, "utf8");

    // readline Interface mit Typen
    const rl: readline.Interface = readline.createInterface({
      input: leseStream,
      crlfDelay: Infinity, // Unterstützt CRLF (\r\n) und LF (\n)
    });

    // Asynchrone Verarbeitung jeder Zeile

    let sum = 0;
    for await (const line of rl) {
      console.log(`Zeile: ${line}`);

      const first = findFirstDigit(line);
      const last = findLastDigit(line);
      const completeDigit = `${first}${last}`;
      console.log(completeDigit);

      const number = Number.parseInt(completeDigit);
      sum += number;
    }

    console.log("Datei komplett gelesen, sum: ", sum);
  } catch (err) {
    console.error("Fehler beim Lesen der Datei:", err);
  }
}

leseZeilen(dateiPfad);

const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield "Hello";
    yield "World";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield "After 1 second!";
  },
};

(async () => {
  for await (const value of asyncIterable) {
    console.log(value);
  }
})();
