const fs = require("fs");
const contactFilePath = "./data/contact.json";

function listRead() {
  fs.readFile(contactFilePath, "utf-8", (err, data) => {
    let contactData = JSON.parse(data);
    contactData.forEach((contact) => {
      console.log(`${contact.name} ${contact.mobile}`);
    });
  });
}

module.exports = listRead;
