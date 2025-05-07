# Lost and Found System 🧳🔍

This repository contains the backend code for a simple **Lost and Found System**, built with **Express.js** and **MongoDB**. It allows users (like campus security or students) to log found items, view, update, and manage lost property records.

---

## 🚀 Features

- Add a found item
- View all unclaimed items
- View a specific item by ID
- Update an item’s details or mark it as claimed
- Delete old/irrelevant entries

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/iygeal/lost-and-found-system.git
cd lost-and-found-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

```bash
Create a .env file and add the following variables:
MONGODB_URI=<your-mongodb-uri>
PORT=<your-port> (I used 5000)
```

### 4. Start the Server
Run the Nodemon (for development)

```bash
npm run dev
```

### API Endpoints
Base URL: http://localhost:5000/api/v1/items

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /unclaimed | Get all unclaimed items |
| GET | /:id | Get a specific item by ID |
| POST | / | Add a found item |
| PUT | /:id | Update an item’s details or mark it as claimed |
| DELETE | /:id | Delete an item |


### Example to test the POST route in Postman

```json
{
  "itemName": "Black Backpack",
  "description": "Contains a laptop and charger",
  "locationFound": "CareerEx Tech Hub",
  "dateFound": "2025-05-05",
  "claimed": false
}
```

### Author
- [Iygeal Anozie](https://github.com/iygeal):
Built as part of a backend development learning project.