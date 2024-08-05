const fs = require("fs").promises;
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const contactFilePath = "./data/contact.json";

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const getUserInput = async () => {
  const name = await askQuestion("Masukan Nama: ");
  const phoneNum = await askQuestion("Masukan Nomor Telepon: ");
  const email = await askQuestion("Masukan Email: ");

  return { name, phoneNum, email };
};

const saveContact = async (name, phoneNum, email) => {
  try {
    // Read existing contacts
    let contacts = [];
    try {
      const data = await fs.readFile(contactFilePath, "utf8");
      contacts = JSON.parse(data);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    // Add new contact
    contacts.push({ name, phoneNum, email });

    // Save contacts back to the file
    await fs.writeFile(contactFilePath, JSON.stringify(contacts, null, 2));
    console.log("Data Tersimpan di data/contact.json");
  } catch (err) {
    console.error("Error saving contact:", err);
  }
};

const main = async () => {
  const userInput = await getUserInput();
  await saveContact(userInput.name, userInput.phoneNum, userInput.email);
  rl.close();
};

main();
