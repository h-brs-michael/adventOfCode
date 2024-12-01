import { readFile } from "../helper";

async function main() {
  const path = "./src/24_01/input.txt";
  const content = await readFile(path);

  const first = content.map((line) =>
    Number.parseInt(line.split("   ")[0].trim())
  );
  const second = content.map((line) =>
    Number.parseInt(line.split("   ")[1].trim())
  );

  console.log({ first, second });
  const firstSorted = first.toSorted();
  const secondSorted = second.toSorted();
  console.log({ firstSorted, secondSorted });

  const diff = firstSorted.map((first, index) => Math.abs(first - secondSorted[index]));

  console.log({ diff });

  const sum = diff.reduce((accumulator, current) => accumulator + current , 0);

  console.log({sum});
}

main();
