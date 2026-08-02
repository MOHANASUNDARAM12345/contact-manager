import { useState, useEffect } from "react";
import "./ContactManager.css";
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Contacts
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [editContact, setEditContact] = useState(null);
  const [search, setSearch] = useState("");

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // Sort
  const [sortOrder, setSortOrder] = useState("default");

  // Save Contacts
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // Save Login Status
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

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

  // Favorite
  const toggleFavorite = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, favorite: !contact.favorite }
          : contact
      )
    );
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  // Search + Sort
  const filteredContacts = [...contacts]
    .filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "favorite") {
        return Number(b.favorite) - Number(a.favorite);
      }

      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === "za") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  // Login Page
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className={darkMode ? "container dark" : "container"}>
      {/* Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          float: "left",
          background: darkMode ? "#444" : "#222",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          float: "right",
          background: "red",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>Contact Manager</h1>
      <p>React CRUD Project</p>

      <ContactForm
        addContact={addContact}
        editContact={editContact}
        updateContact={updateContact}
        contacts={contacts}
      />

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sort */}
      <div className="search-box">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="favorite">⭐ Favorites First</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <ContactList
        contacts={filteredContacts}
        deleteContact={deleteContact}
        setEditContact={setEditContact}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
