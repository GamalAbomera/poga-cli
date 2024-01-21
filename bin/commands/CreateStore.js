const {
  capitalize,
  smallFirstChar,
  createFile,
  checkPath,
} = require("../utils");

class CreateStore {
  constructor() {
    this.args = {};
    this.capitalizedName = "";
  }
  handle(args) {
    if (args._[1]) {
      const name = args._[1];
      const filePath = checkPath(name);
      this.args.name = filePath.fileName;
      this.capitalizedName = capitalize(filePath.fileName);
      // create store file
      const storeTemplatePath = "/templates/javascript/stores/single.store.js";

      // check store dir path and create dirs if not found
      const storePath = `src/${filePath.fullPath || "stores"}/`;

      const storeExportPath =
        storePath + smallFirstChar(this.capitalizedName) + ".store.js";
      createFile(storeTemplatePath, storeExportPath, storePath, (storeFile) => {
        return this.storeCallBack(storeFile);
      });
    } else {
      console.log("[ERROR]: please type store name ");
    }
    return false;
  }
  storeCallBack(storeFile) {
    storeFile = storeFile.replaceAll(
      "[store]",
      smallFirstChar(this.capitalizedName)
    );
    storeFile = storeFile.replaceAll(
      "[store-name]",
      "use" + this.capitalizedName + "Store"
    );
    return storeFile;
  }
}

module.exports = new CreateStore();
