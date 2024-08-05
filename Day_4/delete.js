const fs = require("fs");
const contactFilePath = "./data/contact.json";

function deleteData(index) {
  fs.readFile(contactFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const dataContact = JSON.parse(data);

      // Make sure index is a number and is within the valid range
      if (
        typeof index !== "number" ||
        index < 0 ||
        index >= dataContact.length
      ) {
        console.error("Invalid index.");
        return;
      }

      // Check if item exists and remove it
      if (dataContact.length > 0) {
        dataContact.splice(index, 1);

        // Write the updated array back to the file
        fs.writeFile(
          contactFilePath,
          JSON.stringify(dataContact, null, 2),
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              return;
            }
            console.log("Successfully deleted the item!");
          }
        );
      } else {
        console.error("No data to remove.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}

module.exports = deleteData;
