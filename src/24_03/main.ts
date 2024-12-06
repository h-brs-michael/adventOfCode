import { match } from "assert";
import { readFile } from "../helper";

async function main() {
  const path = "./src/24_03/input.txt";
  const lines = await readFile(path);
  const allLines = lines.reduce(
    (accummulator, current) => accummulator + current,
    ""
  );

  // const input = "@][mul(345,766);'(^mul(343,555)mul(532,723)'>mul(810,622)mul(163,901)select()@?who()select(643,43)'mul(598,56)#;do()from()~where()mul(905,791)select()/why()-when()~;mul(767,89)[#?&mul(874,668)!what(334,491):@@don't()#what()+{}who()mul(746,753)how()~+! -select(814,465)&mul(961,917)$!}?who()from(239,902)]mul(578,658);~' ]mul(693,262)~;mul(830,470)";
  const regex = /mul\(\d+,\d+\)/g;

  const matches = allLines.match(regex);
  if (!matches) {
    return;
  }
  // console.log(matches);

  const mult = matches.map(multF);
  const sum = mult.reduce((accumulator, current) => accumulator + current, 0);
  console.info({ sum });
  // 163931492

  // part2:
  const regexInstr = /(do\(\)|don't\(\)|mul\(\d+,\d+\))/g;
  const instructions = allLines.match(regexInstr) || [];
  console.log(instructions);

  let numbers: number[] = [];
  let codeInstruction: "do" | "dont" = "do";
  for (const instruction of instructions) {
    if (instruction.startsWith("do(")) {
      codeInstruction = "do";
    } else if (instruction.startsWith("don't(")) {
      codeInstruction = "dont";
    }
    // mult
    else if (codeInstruction === "do") {
      const product = multF(instruction);
      numbers.push(product);
    }
  }
  console.log(numbers);
  const sum2 = numbers.reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  console.info({ sum2 });
  // 76911921
}

function multF(multStr: string) {
  const numbers = multStr.replace("mul(", "").replace(")", "");
  const [first, second] = numbers.split(",").map(Number);
  const product = first * second;
  console.log({ numbers, product });
  return product;
}

main();
