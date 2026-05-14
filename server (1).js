const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory storage
const contacts = [];

/*
  Validation Function
*/
function validateContact(data) {
  const { name, email, phone } = data;

  if (!name || !email || !phone) {
    return "Name, email, and phone are required";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  // Phone validation (10 digits)
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phone)) {
    return "Phone must be exactly 10 digits";
  }

  return null;
}

/*
  POST /contacts
  Add new contact
*/
app.post("/contacts", (req, res) => {
  try {
    const error = validateContact(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error
      });
    }

    let { name, email, phone } = req.body;

    // Clean data
    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.trim();

    // Duplicate email check
    const existingContact = contacts.find(
      contact => contact.email === email
    );

    if (existingContact) {
      return res.status(409).json({
        success: false,
        message: "Contact with this email already exists"
      });
    }

    const newContact = {
      id: contacts.length + 1,
      name,
      email,
      phone
    };

    contacts.push(newContact);

    return res.status(201).json({
      success: true,
      message: "Contact added successfully",
      data: newContact
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

/*
  GET /contacts
  Return all contacts sorted by name
*/
app.get("/contacts", (req, res) => {
  try {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return res.status(200).json({
      success: true,
      count: sortedContacts.length,
      data: sortedContacts
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

/*
  Handle Unknown Routes
*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
  Start Server
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});