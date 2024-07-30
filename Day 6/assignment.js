const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readFile("./public/data/contact.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while reading the file.");
    }
    const contactData = JSON.parse(data);
    res.render("assignment", {
      title: "index",
      layout: "layouts/assignLayout",
      contacts: contactData,
    });
  });
});
app.use("/", (req, res) => {
  res.status(404);
  res.send("page not found: 404");
});

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`);
});
