import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface EvalOptions {
  stdin: string;
  timeout: number;
  memory: number;
}

export async function evalCpp(code: string, options?: EvalOptions) {
  return new Promise((resolve, reject) => {
    const { stdin, timeout, memory } = options ?? {
      stdin: "",
      timeout: 10000,
      memory: 512,
    };
    const filename = uuidv4();
    const filePath = path.join("/tmp", `${filename}.cpp`);
    const execPath = path.join("/tmp", filename);
    fs.writeFileSync(filePath, code);
    const command = `g++ -o ${execPath} ${filePath} && timeout ${
      timeout / 1000
    } ${execPath}`;
    const child = exec(
      command,
      { maxBuffer: memory * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          if (error.code === 124) {
            return reject("Time Limit Exceeded");
          }
          return reject(stderr);
        }
        resolve(stdout);
      }
    );
    if (child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    } else {
      reject(new Error("Failed to open stdin for child process"));
    }
  });
}
