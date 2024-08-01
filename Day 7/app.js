const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, param, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const paginate = require("express-paginate");
const fs = require("fs");
const app = express();
const port = 3000;

const filePath = "./public/data/contact.json";
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(paginate.middleware(10, 50));

app.use(expressLayouts);

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Home Page
app.get("/", (req, res) => {
  const contacts = readData();
  const errorMessages = req.query.error ? JSON.parse(req.query.error) : null;
  const old = req.query.old ? JSON.parse(req.query.old) : {};
  const modalOpen = req.query.modalOpen === "true"; // Check if modal should be open

  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const paginatedContacts = contacts.slice(offset, offset + limit);
  const contactCount = contacts.length;
  const pageCount = Math.ceil(contactCount / limit);

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  res.render("index", {
    contacts: paginatedContacts,
    pageCount,
    contactCount,
    pages,
    page,
    limit,
    layout: "layouts/layout",
    errorMessages,
    old,
    modalOpen, // Pass modalOpen flag to the view
  });
});

// Create contact (Post)
app.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("mobilePhone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Mobile phone must be a number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      const query = new URLSearchParams({
        error: JSON.stringify(errorMessages),
        old: JSON.stringify(req.body),
        modalOpen: "true", // Flag to indicate modal should be open
      }).toString();
      return res.redirect(`/?${query}`);
    }

    const contacts = readData();
    const newContact = req.body;
    newContact.id =
      contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    contacts.push(newContact);
    writeData(contacts);
    res.redirect("/");
  }
);

app.get(
  "/contact/edit/:id",
  [
    // Validate the ID parameter
    param("id").isInt().withMessage("ID must be an integer"),

    // Validate the fields you want to update
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("mobilePhone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Must be a valid phone number"),
  ],
  (req, res) => {
    const contacts = readData();
    const id = parseInt(req.params.id);
    const contact = contacts.find((contact) => contact.id === id);
    const error = req.query.error;
    res.render("show", {
      contact,
      error,
      layout: "layouts/layout",
    });
  }
);

// Edit contact (PUT)
app.post(
  "/contact/update/:id",
  [
    // Validate the ID parameter
    param("id").isInt().withMessage("ID must be an integer"),

    // Validate the fields you want to update
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("mobilePhone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Must be a valid phone number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, redirect to '/' with errors as query parameters
      const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");

      return res.redirect(
        `/contact/edit/${req.params.id}/?error=${encodeURIComponent(
          errorMessages
        )}`
      );
    }

    const contacts = readData();
    const id = parseInt(req.params.id);
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...req.body };
      writeData(contacts);
      res.redirect("/");
    } else {
      res.status(404).render("404");
    }
  }
);

// Delete Contact
app.post("/contacts/:id/delete", (req, res) => {
  const contacts = readData();
  const id = parseInt(req.params.id);
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    writeData(contacts);
    res.redirect("back");
  } else {
    res.status(404).render("404");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
