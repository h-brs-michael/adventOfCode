import * as fs from "fs";
import * as readline from "readline";

export async function readFile(path: string, debug = false): Promise<string[]> {
  try {
    const readStream: fs.ReadStream = fs.createReadStream(path, "utf8");

    const rl: readline.Interface = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity, // Unterstützt CRLF (\r\n) und LF (\n)
    });

    const content = [];
    for await (const line of rl) {
      if (debug) {
        console.log(`line: ${line}`);
      }
      content.push(line);
    }
    return content;
  } catch (err: unknown) {
    console.error("error:", err);
    return [];
  }
}
