import fs from "fs-extra";

export const createDirectoryContents = (
  templatePath: string,
  newProjectPath: string
) => {
  const CURR_DIR = process.cwd();

  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      if (file === "favicon.ico") {
        const contents = fs.readFileSync(origFilePath, "binary");

        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, "binary");
      } else {
        // Rename
        if (file === ".npmignore") file = ".gitignore";

        const contents = fs.readFileSync(origFilePath, "utf8");

        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      }
    } else if (stats.isDirectory()) {
      if (!fs.existsSync(`${CURR_DIR}/${newProjectPath}/${file}`)) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      }

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
};
