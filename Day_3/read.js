const fs = require("fs");

const withReadFile = () => {
  fs.readFile("./data/contact.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.parse(data));
  });
};

const data = fs.readFileSync("./data/contact.json");
const obj = JSON.parse(data, function (key, value) {
  if (key == "name") {
    return new String(value);
  } else {
    return value;
  }
});
console.log(obj);
