const fs = require("fs").promises;
const contactFilePath = "./data/contact.json";

async function saveContact(name, email, mobile) {
  try {
    const newContact = { name, email, mobile };

    let contacts = [];
    try {
      const data = await fs.readFile(contactFilePath, "utf8");
      contacts = JSON.parse(data);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    contacts.push(newContact);

    await fs.writeFile(contactFilePath, JSON.stringify(contacts, null, 2));
    console.log("Contact saved successfully:", newContact);
  } catch (err) {
    console.error("Error saving contact:", err);
  }
}

module.exports = saveContact;
