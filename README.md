# Portfolio Backend

Backend API for my personal portfolio website, built to handle portfolio-related data and provide RESTful APIs for the frontend.

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JavaScript
* REST API
* dotenv
* CORS

## 📁 Project Structure

```text
backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Features

* RESTful API architecture
* Portfolio data management
* MongoDB database integration
* Environment variable configuration
* CORS support
* Error handling
* Modular project structure

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <>
```

### 2. Navigate to the backend folder

```bash
cd server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the backend root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Add any other environment variables required by the project.

### 5. Start the server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

## 🔗 API

The backend exposes REST API endpoints for managing portfolio data.

Example:

```text
GET    /api/...
POST   /api/...
PUT    /api/...
DELETE /api/...
```

> The exact endpoints will be documented here as the backend APIs are finalized.

## 🔐 Environment Variables

The following environment variables are required:


## 🧪 Development

To run the project locally:

```bash
npm install
npm run dev
```

Make sure MongoDB is properly configured before starting the server.

## 📌 Future Updates

The frontend will be implemented separately and connected to this backend through the REST APIs.

The README will be updated after the frontend is completed with:

* Frontend technologies
* Complete project structure
* API integration
* Screenshots
* Features
* Live demo
* Deployment information

## 👨‍💻 Author

**Sachin Kumar**

B.Tech Computer Science & Engineering
AKTU

---

⭐ If you find this project useful, consider giving the repository a star.
