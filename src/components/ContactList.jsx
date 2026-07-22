function ContactList({ contacts, deleteContact, setEditContact }) {
  return (
    <div>
      <h2>Contact List</h2>

      {contacts.length === 0 ? (
        <p>No Contacts Found</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h3>{contact.name}</h3>

            <p>Email: {contact.email}</p>

            <p>Phone: {contact.phone}</p>

            <button onClick={() => setEditContact(contact)}>
              Edit
            </button>

            <button
              onClick={() => deleteContact(contact.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;