const { createFile } = require("../utils");
const fs = require("fs");

class InitApi {
  handle(args) {
    if (args.url) {
      const content = `
VITE_DEFAULT_API_VERSION=v1
VITE_URL=${args.url}
      `;
      if (fs.existsSync("./.env")) {
        fs.appendFileSync("./.env", content);
        fs.appendFileSync("./.env.production", content);
        console.log("Modified .env file");
        console.log("Modified .env.production file");
      } else {
        fs.writeFileSync("./.env", content);
        fs.writeFileSync("./.env.production", content);
        console.log("Created .env file");
        console.log("Created .env.production file");
      }
    }
    // create api file
    const apiTemplatePath = "/templates/javascript/api/client.api.js";

    // check api dir path and create dirs if not found
    const apiPath = `src/${args.path || "shared/api"}/`;

    const apiExportPath = apiPath + (args.name || "client") + ".api.js";
    createFile(apiTemplatePath, apiExportPath, apiPath, (apiFile) => {
      return apiFile;
    });
  }
}

module.exports = new InitApi();
