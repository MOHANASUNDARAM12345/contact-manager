import { useState, useEffect } from "react";

function ContactForm({
  addContact,
  editContact,
  updateContact,
  contacts,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setPhone(editContact.phone);
      setPhoto(editContact.photo || "");
    }
  }, [editContact]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    // Empty Validation
    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      alert("Please fill all fields!");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Phone Validation
    if (!/^\d{10}$/.test(trimmedPhone)) {
      alert("Phone number must contain exactly 10 digits!");
      return;
    }

    // Duplicate Phone Validation
    const duplicate = contacts.find(
      (contact) =>
        contact.phone === trimmedPhone &&
        (!editContact || contact.id !== editContact.id)
    );

    if (duplicate) {
      alert("This phone number already exists!");
      return;
    }

    // Capitalize Name
    const formattedName = trimmedName
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
      )
      .join(" ");

    const contact = {
      id: editContact ? editContact.id : Date.now(),
      name: formattedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      favorite: editContact ? editContact.favorite : false,
      photo: photo,
    };

    if (editContact) {
      updateContact(contact);
    } else {
      addContact(contact);
    }

    setName("");
    setEmail("");
    setPhone("");
    setPhoto("");
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

      <input
        type="file"
        accept="image/*"
        onChange={handlePhoto}
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