#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
import { execSync } from "child_process";

let CHOICES = fs.readdirSync(`${__dirname}/templates`);

for (let x in CHOICES) {
  CHOICES[x] = CHOICES[x].replace("_", " ");
}

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    }
  },
  {
    name: "install-deps",
    type: "confirm",
    message: "Do you want us to install the dependencies?"
  },
  {
    name: "git-init",
    type: "confirm",
    message: "Do you want us to initialize git?"
  }
];

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
};

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers["project-choice"];
  const projectName = answers["project-name"];
  const installDeps = answers["install-deps"];
  const gitInit = answers["git-init"];
  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  createDirectoryContents(templatePath, projectName);

  const installDepsCommand = `cd ${projectName} && npm install && npm update --save && cd ../`;
  const gitInitCommand = `cd ${projectName} && git init && touch .gitignore && echo "node_modules" >> .gitignore && echo ".env" >> .gitignore && cd ../`;

  if (installDeps) {
    console.log("Installing dependencies");
    runCommand(installDepsCommand);
  }

  if (gitInit) {
    console.log("Initializing git");
    runCommand(gitInitCommand);
  }

  console.log(
    `Your project is ready!\nNext steps:\n  Enter cd ${projectName} into the cli\n  Make sure to follow the instructions on the README. \n  Happy coding!`
  );
});
