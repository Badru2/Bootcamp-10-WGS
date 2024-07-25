const validator = require("validator");
const fs = require("fs");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "Masukan Nama : ",
  "Masukan Nomor Telepon : ",
  "Masukan Email : ",
];

let userData = [];
const dataPath = "./data/contact.json";

function askQuestion(index, currentUserData = {}) {
  if (index === questions.length) {
    userData.push(currentUserData);

    if (!fs.existsSync("./data")) fs.mkdirSync("data");

    fs.writeFile(dataPath, JSON.stringify(userData, null, 3), (err) => {
      if (err) throw err;
      console.log("Data Tersimpan di data/contact.json");
      rl.close();
    });
  } else {
    rl.question(questions[index], (answer) => {
      if (index === 0) currentUserData.name = answer;
      if (index === 1) currentUserData.phoneNum = answer;
      if (index === 2) currentUserData.email = answer;
      askQuestion(index + 1, currentUserData);
    });
  }
}

fs.readFile(dataPath, (err, data) => {
  if (err && err.code === "ENOENT") {
    userData = [];
  } else {
    userData = JSON.parse(data);
  }

  askQuestion(0);
});
