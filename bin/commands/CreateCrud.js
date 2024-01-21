const fs = require("fs");
const path = require("path");
const { capitalize, smallFirstChar, createFile } = require("../utils");
class CreateCrud {
  constructor() {
    this.capitalizedName = "";
    this.smallName = "";
    this.componentPath = "";
    this.storesPath = "";
    this.apisPath = "";
    this.args = {};
  }
  handle(args, name) {
    // init
    if (!name._[1] || !args.resource) {
      console.log(
        "[ERROR]: type crud name and resource use the following command"
      );
      console.log("voip create-curd <crud-name> --r <api-resource>");
      return false;
    }
    this.args = args;
    this.args.client = args.client || "@/shared/api/api.client";
    this.capitalizedName = capitalize(name._[1]);
    this.smallName = smallFirstChar(this.capitalizedName);
    // files paths
    // check components dir path and create dirs if not found
    const cPath = args.c || `components`;
    this.componentPath = `src/${cPath}/${this.capitalizedName}/`;

    // check store dir path and create dirs if not found
    const sPath = args.s || `stores`;
    this.storesPath = `src/${sPath}/`;

    // check api dir path and create dirs if not found
    const aPath = args.a || `shared/api`;
    this.apisPath = `src/${aPath}/`;

    // create a component file
    const componentExportPath =
      this.componentPath + this.capitalizedName + ".vue";
    const componentTemplatePath = "/templates/vue/crud/list.component.vue";
    createFile(
      componentTemplatePath,
      componentExportPath,
      this.componentPath,
      (stringFile) => {
        return this.componentCallback(stringFile);
      }
    );

    // create a form builder file
    const builderTemplatePath =
      "/templates/vue/crud/form-builder.component.vue";
    const builderExportPath = this.componentPath + "FormBuilder.vue";
    createFile(
      builderTemplatePath,
      builderExportPath,
      this.componentPath,
      (builderString) => {
        return this.builderCallBack(builderString);
      }
    );

    // create store file
    const storeTemplatePath = "/templates/javascript/stores/simple.store.js";
    const storeExportPath =
      this.storesPath + smallFirstChar(this.capitalizedName) + ".store.js";
    createFile(
      storeTemplatePath,
      storeExportPath,
      this.storesPath,
      (storeFile) => {
        return this.storeCallBack(storeFile);
      }
    );

    // create api file
    const apiTemplatePath = "/templates/javascript/api/simple.api.js";
    const apiExportPath =
      this.apisPath + smallFirstChar(this.capitalizedName) + ".api.js";
    createFile(apiTemplatePath, apiExportPath, this.apisPath, (apiFile) => {
      return this.apiCallBack(apiFile);
    });
  }

  componentCallback(stringFile) {
    stringFile = stringFile.replaceAll("[class-name]", this.args?.name);
    stringFile = stringFile.replaceAll(
      "[component-name]",
      this.capitalizedName
    );
    stringFile = stringFile.replaceAll("[table-title]", this.capitalizedName);
    stringFile = stringFile.replaceAll(
      "[store-name]",
      "use" + this.capitalizedName + "Store"
    );
    stringFile = stringFile.replaceAll(
      "[store-path]",
      "/" + this.storesPath + this.smallName + ".store.js"
    );
    return stringFile;
  }
  builderCallBack(builderString) {
    builderString = builderString.replaceAll(
      "[component-name]",
      this.capitalizedName
    );
    builderString = builderString.replaceAll(
      "[store-name]",
      "use" + this.capitalizedName + "Store"
    );
    builderString = builderString.replaceAll(
      "[store-path]",
      "/" + this.storesPath + smallFirstChar(this.capitalizedName) + ".store.js"
    );

    return builderString;
  }
  storeCallBack(storeFile) {
    storeFile = storeFile.replaceAll(
      "[api-class]",
      this.capitalizedName + "Api"
    );
    storeFile = storeFile.replaceAll(
      "[api-path]",
      this.apisPath + smallFirstChar(this.capitalizedName) + ".api.js"
    );
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
  apiCallBack(apiFile) {
    apiFile = apiFile.replaceAll("[api-class]", this.capitalizedName + "Api");
    apiFile = apiFile.replaceAll("[api-client]", this.args.client);
    apiFile = apiFile.replaceAll("[api-resource]", this.args.resource);

    return apiFile;
  }
}

module.exports = new CreateCrud();
