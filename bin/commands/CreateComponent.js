const { capitalize, createFile, checkPath } = require("../utils");

class CreateComponent {
  constructor() {
    this.args = {};
    this.capitalizedName = "";
  }
  handle(args, customTemplate) {
    if (args._[1]) {
      const name = args._[1];
      const filePath = checkPath(name);
      this.args.name = filePath.fileName;
      this.capitalizedName = capitalize(filePath.fileName);
      // create component file
      const componentTemplatePath = "/templates/vue/component.vue";

      // check components dir path and create dirs if not found
      const componentPath = `src/${filePath.fullPath || "components"}/${
        this.capitalizedName
      }/`;

      const componentExportPath = componentPath + this.capitalizedName + ".vue";
      createFile(
        componentTemplatePath,
        componentExportPath,
        componentPath,
        (componentFile) => {
          return this.componentCallBack(componentFile);
        },
        customTemplate
      );
    } else {
      console.log("[ERROR]: please type component name ");
    }
    return false;
  }
  componentCallBack(componentFile) {
    componentFile = componentFile.replaceAll(
      "[component-name]",
      this.capitalizedName
    );
    componentFile = componentFile.replaceAll("[class-name]", this.args.name);
    return componentFile;
  }
}

module.exports = new CreateComponent();
