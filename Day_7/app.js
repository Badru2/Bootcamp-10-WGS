const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { body, param, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const paginate = require("express-paginate");
const fs = require("fs");
const app = express();
const port = 3001;
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "postgres",
});

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
app.get("/", async (req, res) => {
  try {
    const contacts = await pool.query("SELECT * FROM contacts");
    const errorMessages = req.query.error ? JSON.parse(req.query.error) : null;
    const old = req.query.old ? JSON.parse(req.query.old) : {};
    const modalOpen = req.query.modalOpen === "true";

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const paginatedContacts = contacts.rows.slice(offset, offset + limit);
    const contactCount = contacts.rows.length;
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
      modalOpen,
    });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Internal Server Error");
  }
});

// Create contact (Post)
app.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("mobile_phone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Mobile phone must be a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      const query = new URLSearchParams({
        error: JSON.stringify(errorMessages),
        old: JSON.stringify(req.body),
        modalOpen: "true",
      }).toString();
      return res.redirect(`/?${query}`);
    }

    try {
      await pool.query(
        "INSERT INTO contacts (name, email, mobile_phone) VALUES ($1, $2, $3)",
        [req.body.name, req.body.email, req.body.mobile_phone]
      );
      res.redirect("/");
    } catch (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.get(
  "/contact/edit/:id",
  param("id").isInt().withMessage("ID must be an integer"),
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await pool.query("SELECT * FROM contacts WHERE id = $1", [
        id,
      ]);
      if (contact.rows.length === 0) {
        return res.status(404).render("404");
      }
      res.render("show", {
        contact: contact.rows[0],
        error: req.query.error,
        layout: "layouts/layout",
      });
    } catch (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Edit contact (PUT)
app.post(
  "/contact/update/:id",
  [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Must be a valid email"),
    body("mobile_phone")
      .optional()
      .isMobilePhone("id-ID")
      .withMessage("Must be a valid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

    try {
      const id = parseInt(req.params.id);
      const updateResult = await pool.query(
        "UPDATE contacts SET name = $1, email = $2, mobile_phone = $3 WHERE id = $4",
        [req.body.name, req.body.email, req.body.mobile_phone, id]
      );
      if (updateResult.rowCount > 0) {
        res.redirect("/");
      } else {
        res.status(404).render("404");
      }
    } catch (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Delete Contact
app.post("/contacts/:id/delete", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteResult = await pool.query(
      "DELETE FROM contacts WHERE id = $1",
      [id]
    );
    if (deleteResult.rowCount > 0) {
      res.redirect("back");
    } else {
      res.status(404).render("404");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
