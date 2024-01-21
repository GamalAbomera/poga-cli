const {
  capitalize,
  smallFirstChar,
  createFile,
  checkPath,
} = require("../utils");

class CreateApi {
  constructor() {
    this.args = {};
    this.capitalizedName = "";
  }
  handle(args, globalArgs) {
    if (globalArgs._[1]) {
      const name = globalArgs._[1];
      const filePath = checkPath(name);
      this.args.name = filePath.fileName;
      this.args.client = args.client || "@/shared/api/api.client";
      this.args.resource = args.resource || "api/test/list";
      this.capitalizedName = capitalize(filePath.fileName);
      // create api file
      const apiTemplatePath = "/templates/javascript/api/simple.api.js";

      // check api dir path and create dirs if not found
      const apiPath = `src/${filePath.fullPath || "shared/api"}/`;

      const apiExportPath =
        apiPath + smallFirstChar(this.capitalizedName) + ".api.js";
      createFile(apiTemplatePath, apiExportPath, apiPath, (apiFile) => {
        return this.apiCallBack(apiFile);
      });
    } else {
      console.log("[ERROR]: please type api name ");
    }
    return false;
  }
  apiCallBack(apiFile) {
    apiFile = apiFile.replaceAll("[api-resource]", this.args.resource);
    apiFile = apiFile.replaceAll("[api-client]", this.args.client);
    apiFile = apiFile.replaceAll("[api-class]", this.capitalizedName + "Api");
    return apiFile;
  }
}

module.exports = new CreateApi();
