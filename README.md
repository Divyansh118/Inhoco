# Contacts REST API

Simple REST API built using Node.js and Express.

## Features

- Add contacts
- Get all contacts
- Input validation
- Duplicate email checking
- Error handling
- In-memory storage

---

## Installation

1. Clone the project

2. Install dependencies

npm install

3. Start server

npm start

---

## Server

Runs on:

http://localhost:3000

---

## API Endpoints

### POST /contacts

Add a new contact.

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}

Success Response:

{
  "success": true,
  "message": "Contact added successfully"
}

---

### GET /contacts

Returns all contacts sorted alphabetically by name.

Response:

{
  "success": true,
  "count": 1,
  "data": [...]
}

---

## Validation Rules

- name is required
- valid email format required
- phone must contain exactly 10 digits
- duplicate emails are not allowed

---

## Error Codes

- 400 → Bad Request
- 404 → Route Not Found
- 409 → Duplicate Contact
- 500 → Internal Server Error
