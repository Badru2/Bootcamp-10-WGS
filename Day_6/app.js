const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "index", layout: "layouts/layout" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about", layout: "layouts/layout" });
});

app.get("/contact", (req, res) => {
  contacts = [
    {
      name: "Udin",
      email: "udin@gmail.com",
    },
    {
      name: "Dadang",
      email: "dadang@gmail.com",
    },
    {
      name: "Kasja",
      email: "kasja@gmail.com",
    },
  ];
  res.render("contact", { title: "Contact", layout: "layouts/layout" });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("page not found: 404");
});

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`);
});
