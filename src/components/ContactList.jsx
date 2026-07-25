function ContactList({
  contacts,
  deleteContact,
  setEditContact,
  toggleFavorite,
}) {
  return (
    <div>
      <h2>Contact List</h2>

      {contacts.length === 0 ? (
        <p>No Contacts Found</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card">

            {/* Contact Photo */}
            {contact.photo ? (
              <img
                src={contact.photo}
                alt={contact.name}
                className="contact-photo"
              />
            ) : (
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
            )}

            <h3>
              {contact.favorite ? "⭐ " : "☆ "}
              {contact.name}
            </h3>

            <p>
              <strong>Email:</strong> {contact.email}
            </p>

            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>

            <button
              onClick={() => toggleFavorite(contact.id)}
              style={{
                background: contact.favorite ? "gold" : "#6c757d",
                color: contact.favorite ? "black" : "white",
              }}
            >
              {contact.favorite ? "★ Favorite" : "☆ Favorite"}
            </button>

            <button
              onClick={() => setEditContact(contact)}
              style={{ marginLeft: "10px" }}
            >
              ✏ Edit
            </button>

            <button
              onClick={() => deleteContact(contact.id)}
              style={{
                marginLeft: "10px",
                background: "red",
              }}
            >
              🗑 Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;