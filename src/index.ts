#!/usr/bin/env node

import { input, confirm } from "@inquirer/prompts";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createDirectoryContents } from "./utils/createDirectoryContents.js";
import { addPackageDependency } from "./utils/addPackageDependency.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const tools: string[] = [];
  const CURR_DIR = process.cwd();
  let projectPath = CURR_DIR;
  let projectName = "";

  await input({
    message: "What is your project name?",
    validate: (input) => {
      if (!input) {
        return "Please enter a project name";
      }
      if (fs.existsSync(input)) {
        return `Directory with name ${input} already exists`;
      }

      projectPath = `${CURR_DIR}/${input}`;
      projectName = input;
      fs.mkdirSync(projectPath);

      const templatePath = path.join(__dirname, "../templates/base");
      createDirectoryContents(templatePath, projectName);
      return true;
    },
  });

  const trpc = await confirm({
    message: "Would you like to use tRPC?",
  });

  if (trpc) {
    tools.push("trpc");

    const templatePath = path.join(__dirname, "../templates/trpc");
    createDirectoryContents(templatePath, projectName);
    addPackageDependency({
      dependencies: [
        "@trpc/client",
        "@trpc/server",
        "@trpc/next",
        "@trpc/react-query",
        "@trpc/next",
        "@tanstack/react-query",
        "superjson",
        "server-only",
      ],
      devMode: false,
      projectDir: projectPath,
    });
  }

  const drizzle = await confirm({
    message: "Would you like to use Drizzle?",
  });

  if (drizzle) {
    tools.push("drizzle");

    const templatePath = path.join(__dirname, "../templates/drizzle");
    createDirectoryContents(templatePath, projectName);
    addPackageDependency({
      dependencies: [
        "drizzle-orm",
        "drizzle-kit",
        "eslint-plugin-drizzle",
        "@libsql/client",
      ],
      devMode: false,
      projectDir: projectPath,
    });
    addPackageDependency({
      dependencies: ["drizzle-kit", "eslint-plugin-drizzle"],
      devMode: true,
      projectDir: projectPath,
    });

    if (trpc) {
      const templatePath = path.join(__dirname, "../templates/trpc+drizzle");
      createDirectoryContents(templatePath, projectName);
    }

    // Only add Better Auth if Drizzle is enabled
    const betterAuth = await confirm({
      message: "Would you like to use BetterAuth?",
    });

    if (betterAuth) {
      tools.push("betterauth");
      const templatePath = path.join(__dirname, "../templates/betterauth");
      createDirectoryContents(templatePath, projectName);
      addPackageDependency({
        dependencies: ["better-auth"],
        devMode: false,
        projectDir: projectPath,
      });
    }

    if (betterAuth && trpc) {
      const templatePath = path.join(__dirname, "../templates/trpc+betterauth");
      createDirectoryContents(templatePath, projectName);
    }
  }

  const playwright = await confirm({
    message: "Would you like to use Playwright?",
  });

  if (playwright) {
    tools.push("playwright");
    const templatePath = path.join(__dirname, "../templates/playwright");
    createDirectoryContents(templatePath, projectName);
    addPackageDependency({
      dependencies: ["@playwright/test"],
      devMode: true,
      projectDir: projectPath,
    });
  }

  // const prompts = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "playwright",
  //     message: "Would you like to use Playwright?",
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
