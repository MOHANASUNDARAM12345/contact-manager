import { useState, useEffect } from "react";

function ContactForm({ addContact, editContact, updateContact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setPhone(editContact.phone);
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const contact = {
      id: editContact ? editContact.id : Date.now(),
      name,
      email,
      phone,
    };

    if (editContact) {
      updateContact(contact);
    } else {
      addContact(contact);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editContact ? "Edit Contact" : "Add Contact"}</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">
        {editContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}

export default ContactForm;