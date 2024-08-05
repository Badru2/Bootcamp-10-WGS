const fs = require("fs");
const contactFilePath = "./data/contact.json";

function detail(index) {
  fs.readFile(contactFilePath, "utf-8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return;
    }

    try {
      const dataContact = JSON.parse(data);

      if (index >= 0 && index < dataContact.length) {
        console.log(index);
        console.log(dataContact[index].name);
        console.log(dataContact[index].email);
        console.log(dataContact[index].mobile);
      } else {
        console.log("Index out of range.");
      }
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = detail;
