const validator = require("validator");
const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function InputUserSync() {
  readline.question("Siapa nama nya? ", (nama) => {
    fs.writeFileSync(`${nama}.txt`, `Nama : ${nama}\n`);
    console.log(`Kamu adalah ${nama}`);

    AskMobilePhone();

    function AskMobilePhone() {
      readline.question("Nomor Telepon? ", (noTelp) => {
        if (validator.isMobilePhone(noTelp, ["id-ID"])) {
          fs.appendFile(`${nama}.txt`, `Nomor Telepon : ${noTelp}\n`, (err) => {
            if (err) throw err;
          });

          AskEmail();

          function AskEmail() {
            readline.question("Email ? ", (email) => {
              if (validator.isEmail(email)) {
                fs.appendFile(`${nama}.txt`, `Email : ${email}`, (err) => {
                  if (err) throw err;
                });
                console.log(`Email ${email}`);

                readline.close();
              } else {
                console.log("Email Salah Coba Lagi");
                AskEmail();
              }
            });
          }
        } else {
          console.log("Nomor Telepon Salah Coba Lagi");
          AskMobilePhone();
        }
      });
    }
  });
}

InputUserSync();

function ReadFile() {
  fs.writeFileSync("test.txt", "Function Sync");
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  fs.appendFile("test.txt", "Whut De Hell", (err) => {
    if (err) throw err;
    console.log("Whut da hell");
  });
}

function WithPrompt() {
  const prompt = require("prompt");
  prompt.start();
  prompt.get(["username", "email"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log("Command-line input received:");
    console.log("  Username: " + result.username);
    console.log("  Email: " + result.email);
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }
}
