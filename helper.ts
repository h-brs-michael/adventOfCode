import * as fs from "fs";
import * as readline from "readline";

export async function readFile(dateiPfad: string, print = false): Promise<string[]> {
    try {
      const leseStream: fs.ReadStream = fs.createReadStream(dateiPfad, "utf8");
  
      const rl: readline.Interface = readline.createInterface({
        input: leseStream,
        crlfDelay: Infinity, // Unterstützt CRLF (\r\n) und LF (\n)
      });
  
      const content = [];

      for await (const line of rl) {
        console.log(`line: ${line}`);
        content.push(line);
      }
      return content;
  
    } catch (err: unknown) {
      console.error("error:", err);
      return [];
    }
  }