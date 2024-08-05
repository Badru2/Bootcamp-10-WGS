const yargs = require("yargs");
const saveContact = require("./saveContact");
const listRead = require("./listRead");
const detail = require("./detail");
const deleteData = require("./delete");
const fs = require("fs");
const contactFilePath = "./data/contact.json";

yargs
  .command({
    command: "add",
    describe: "add new contact",
    builder: {
      name: {
        describe: "Contact Name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Contact Email",
        demandOption: false,
        type: "string",
      },
      mobile: {
        describe: "contact mobile phone number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.mobile);
    },
  })
  .command({
    command: "list",
    describe: "list all contact",
    handler() {
      listRead();
    },
  })
  .command({
    command: "detail",
    describe: "detail of contact",
    builder: {
      index: {
        describe: "get a index of data",
        demandOption: true,
        type: "number",
      },
    },
    handler(argv) {
      detail(argv.index);
    },
  })
  .command({
    command: "delete",
    describe: "delete specific data",
    builder: {
      index: {
        describe: "get a index of data",
        demandOption: true,
        type: "number",
      },
    },
    handler(argv) {
      deleteData(argv.index);
    },
  });

yargs.parse();
