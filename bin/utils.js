const fs = require("fs");

function capitalize(string) {
  let result = "";
  string.split("-").forEach((element) => {
    result += element[0].toUpperCase();
    result += element.slice(1);
  });
  return result;
}
function smallFirstChar(string) {
  return string[0].toLowerCase() + string.slice(1);
}

function ensureDirectoryExistence(filePath) {
  fs.mkdirSync(filePath, { recursive: true });
}
function createFile(
  templatePath,
  exportPath,
  dirPath,
  callback,
  customTemplate = null
) {
  // read a template file
  const templateFile = fs.readFileSync(
    customTemplate || __dirname + templatePath
  );
  let stringFile = templateFile.toString();
  ensureDirectoryExistence(dirPath);
  // write a file
  fs.writeFileSync(exportPath, callback(stringFile));
  console.log("Created " + exportPath);
}

function checkPath(string) {
  const stringPath = string.split("/");
  const lastIndex = stringPath.length - 1;
  if (stringPath.length > 1) {
    return {
      fileName: stringPath[lastIndex],
      fullPath: stringPath.filter((el, index) => index != lastIndex).join("/"),
    };
  }
  return {
    fileName: string,
    fullPath: "",
  };
}
module.exports = {
  capitalize,
  smallFirstChar,
  ensureDirectoryExistence,
  createFile,
  checkPath,
};
