const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "index" });
});

app.get("/about", (req, res) => {
  res.render("about");
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
  res.render("contact");
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "../about.html"));
// });

// app.get("/contact", (req, res) => {
//   res.sendFile(path.join(__dirname, "../contact.html"));
// });

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const category = req.query.category;

  res.send(`product id : <b>${id}</b> <br> category : <b>${category}</b>`);
});

app.get("/category/:category", (req, res) => {
  res.send("product category: " + req.params.category);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("page not found: 404");
});

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`);
});
