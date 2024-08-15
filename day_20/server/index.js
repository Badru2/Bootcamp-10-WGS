import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";

const { Pool } = pkg;
const app = express();
const port = 8000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contacts",
  password: "1234",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/api/contacts", async (req, res) => {
  const { name, email, mobile_phone } = req.body;

  try {
    const newContact = await pool.query(
      `INSERT INTO contacts (name, email, mobile_phone) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, mobile_phone]
    );
    res.json(newContact.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const allContacts = await pool.query("SELECT * FROM contacts");
    res.json(allContacts.rows);
  } catch (error) {
    console.error(error);
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile_phone } = req.body;

  try {
    const updateContact = await pool.query(
      `UPDATE contacts SET name = $1, email = $2, mobile_phone = $3 WHERE id = $4`,
      [name, email, mobile_phone, id]
    );

    if (updatedContact.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(updatedContact.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// Delete a contact
app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteContact = await pool.query(
      `DELETE FROM contacts WHERE id = $1 RETURNING *`,
      [id]
    );

    if (deleteContact.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({
      message: "Contact deleted successfully",
      contact: deleteContact.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
