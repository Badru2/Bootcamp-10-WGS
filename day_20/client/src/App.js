import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_phone, setMobilePhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8000/api/contacts/${currentContact.id}`,
          {
            name,
            email,
            mobile_phone,
          }
        );
        setEditing(false);
        setCurrentContact(null);
      } else {
        await axios.post("http://localhost:8000/api/contacts", {
          name,
          email,
          mobile_phone,
        });
      }

      setName("");
      setEmail("");
      setMobilePhone("");
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("There was an error fetching the contacts!", error);
    }
  };

  const handleEdit = (contact) => {
    setEditing(true);
    setCurrentContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setMobilePhone(contact.mobile_phone);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setCurrentContact(null);
    setName("");
    setEmail("");
    setMobilePhone("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${id}`);
      fetchContacts(); // Refresh the list after deletion
    } catch (error) {
      console.error("There was an error deleting the contact!", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto shadow-lg p-5 space-y-3 mt-3"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-black rounded-sm"
        />
        <input
          type="number"
          placeholder="Mobile Phone"
          value={mobile_phone}
          onChange={(e) => setMobilePhone(e.target.value)}
          className="w-full p-2 border border-black rounded-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 font-bold text-white rounded-sm"
        >
          {editing ? "Update Contact" : "Add Contact"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-4 py-2 bg-red-500 font-bold text-white rounded-sm ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="w-1/2 mx-auto shadow-lg mt-3 p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black">
              <td>Name</td>
              <td>Email</td>
              <td>Mobile Phone</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="h-12 border-b border-black">
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile_phone}</td>
                <td>
                  <button
                    onClick={() => handleEdit(contact)}
                    className="px-4 py-1 bg-green-500 font-bold text-white rounded-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="px-4 py-1 bg-red-500 font-bold text-white rounded-sm ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
