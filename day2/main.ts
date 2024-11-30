import { readFile } from "../helper";

async function main() {
  // The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?
  const path = "./day2/input.txt";

  const content = await readFile(path);

  // part 1
  const possibleGames = getPossibleGames(content);
  console.log(possibleGames);
  const sum = getSum(possibleGames);
  console.log({ sum });

  //part 2
  const powers = getGamePowers(content, true);
  console.log({ powers });
  const sumPowers = getSum(powers);
  console.log({ sumPowers });
}

type GameCount = { red: number; green: number; blue: number };

function getSum(list: number[]) {
  return list.reduce<number>(
    (accumulator, current) => accumulator + current,
    0
  );
}

function getGamePowers(content: string[], debug = false): number[] {
  const powers = content.map((game) => {
    const gameString = game.split(":");
    const [prefix, gameContent] = gameString;

    const sets = gameContent.split(";");

    // for each set
    const counts = sets.map(findCounts);

    const maxRed = counts.reduce((accumulator, { red }) => {
      return red > accumulator ? red : accumulator;
    }, 0);
    const maxBlue = counts.reduce((accumulator, { blue }) => {
      return blue > accumulator ? blue : accumulator;
    }, 0);
    const maxGreen = counts.reduce((accumulator, { green }) => {
      return green > accumulator ? green : accumulator;
    }, 0);

    if (debug) {
      console.log({ maxGreen, maxBlue, maxRed });
    }

    return maxBlue * maxGreen * maxRed;
  });

  return powers;
}

function getPossibleGames(content: string[]): number[] {
  const possibleGames: number[] = [];

  // for each game
  for (const game of content) {
    const gameString = game.split(":");
    const [prefix, gameContent] = gameString;
    // console.log({ prefix, gameContent });

    const sets = gameContent.split(";");
    // console.log(sets);

    // for each set
    const counts = sets.map(findCounts);
    console.log(counts);
    const impossible = counts.find(
      ({ red, blue, green }) => red > 12 || green > 13 || blue > 14
    );
    const gameId = getGameId(prefix);
    if (!impossible) {
      const gameId = getGameId(prefix);
      console.log(`Game: ${gameId} is possible`);
      possibleGames.push(gameId);
    } else {
      console.log(`Game: ${gameId} is NOT possible`);
    }
  }

  return possibleGames;
}

function findCounts(set: string): GameCount {
  const result = { red: 0, green: 0, blue: 0 };

  const colorStrings = set.split(",").map((colorString) => colorString.trim());
  const overwrite = colorStrings.reduce<Record<string, number>>(
    (accumulator, current) => {
      const [count, color] = current.split(" ");
      accumulator[color] = Number.parseInt(count);
      return accumulator;
    },
    {}
  );

  return { ...result, ...overwrite };
}

function getGameId(prefix: string): number {
  const gameIDString = prefix.replace("Game", "").trim();
  const gameID = Number.parseInt(gameIDString);
  return gameID;
}

main();
