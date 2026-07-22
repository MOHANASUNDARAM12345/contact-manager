import { useState, useEffect } from "react";
import "./ContactManager.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  // Load contacts from Local Storage
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [editContact, setEditContact] = useState(null);
  const [search, setSearch] = useState("");

  // Save contacts to Local Storage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Add Contact
  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  // Delete Contact
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Update Contact
  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );

    setEditContact(null);
  };

  // Search Contact
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <p>React CRUD Project</p>

      <ContactForm
        addContact={addContact}
        editContact={editContact}
        updateContact={updateContact}
      />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ContactList
        contacts={filteredContacts}
        deleteContact={deleteContact}
        setEditContact={setEditContact}
      />
    </div>
  );
}

export default App;