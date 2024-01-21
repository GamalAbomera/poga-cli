#! /usr/bin/env node
const yargs = require("yargs");
const CreateCrud = require("./commands/CreateCrud");
const CreateComponent = require("./commands/CreateComponent");
const CreateStore = require("./commands/CreateStore");
const CreateApi = require("./commands/CreateApi");
const InitApi = require("./commands/InitApi");
const usage = "\nUsage: voip generate crud <crud-name>";
const options = yargs.usage(usage);

options
  .command(
    "create-crud",
    "create a new crud ",
    {
      resource: {
        alias: "r",
      },
      store: {
        alias: "s",
      },
      api: {
        alias: "a",
      },
      component: {
        alias: "c",
      },
      client: {},
    },
    (args) => {
      CreateCrud.handle(args, yargs.argv);
    }
  )
  .command(
    "create-component",
    "create a new component ",
    {
      template: {
        alias: "t",
      },
    },
    (args) => {
      CreateComponent.handle(yargs.argv, args.template);
    }
  )
  .command("create-store", "create a new store ", {}, () => {
    CreateStore.handle(yargs.argv);
  })
  .command(
    "create-api",
    "create a new api ",
    {
      client: {
        alias: "c",
      },
      resource: {
        alias: "r",
      },
    },
    (args) => {
      CreateApi.handle(args, yargs.argv);
    }
  )
  .command(
    "init-api",
    "initialize api client ",
    {
      path: {
        alias: "p",
      },
      name: {
        alias: "n",
      },
      url: {
        alias: "u",
      },
    },
    (args) => {
      InitApi.handle(args);
    }
  )
  .help(true);

if (!yargs.argv._[0]) {
  console.log(
    "[ERROR]: You must use create command for create your crud's files"
  );
}
