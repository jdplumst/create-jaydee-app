#!/usr/bin/env node

import { input, confirm } from "@inquirer/prompts";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createDirectoryContents } from "./utils/createDirectoryContents.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const tools: string[] = [];

  await input({
    message: "What is your project name?",
    validate: (input) => {
      if (!input) {
        return "Please enter a project name";
      }
      if (fs.existsSync(input)) {
        return `Directory with name ${input} already exists`;
      }

      const CURR_DIR = process.cwd();
      fs.mkdirSync(`${CURR_DIR}/${input}`);

      const templatePath = path.join(__dirname, "../templates/base");
      console.log(templatePath);
      createDirectoryContents(templatePath, input);
      return true;
    },
  });

  const drizzle = await confirm({
    message: "Would you like to use Drizzle?",
  });

  if (drizzle) {
    tools.push("drizzle");
  }

  // const prompts = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "trpc",
  //     message: "Would you like to use tRPC?",
  //   },
  //   {
  //     type: "confirm",
  //     name: "playwright",
  //     message: "Would you like to use Playwright?",
  //   },
  //   {
  //     type: "confirm",
  //     name: "betterauth",
  //     message: "Would you like to use Better Auth?",
  //   },
  //   {
  //     type: "confirm",
  //     name: "githubactions",
  //     message: "Would you like to use GitHub Actions?",
  //   },
  //   {
  //     type: "confirm",
  //     name: "git",
  //     message: "Would you like us to initialize a git repository?",
  //   },
  //   {
  //     type: "confirm",
  //     name: "install",
  //     message: "Would you like to install the dependencies?",
  //   },
  // ]);
}

main();
