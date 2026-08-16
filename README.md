# Sachin Kumar — Full Stack Developer Portfolio

A modern, responsive **full-stack developer portfolio** built to showcase my projects, technical skills, education, experience, certifications, achievements, resume, and professional profile.

The project includes a public portfolio website along with a secure owner dashboard for managing portfolio content dynamically.

## 🚀 Live Demo

**Frontend:** https://sachin-jadaun-portfolio.vercel.app

**Backend API:** https://sachin-jadaun-portfolio.onrender.com

**Video URL:** https://youtu.be/SxrFKKSKlVs

---

## ✨ Features

### 🌐 Public Portfolio

* Responsive portfolio website
* Hero section with profile     information
* About section
* Technical skills
* Projects showcase
* Experience
* Education
* Certificates and achievements
* Resume / CV section
* Contact section
* Visitor reviews and ratings
* Portfolio section search
* Dark/light theme support
* Responsive navigation and sidebar
* Mobile-friendly design

### 🔐 Owner Authentication

* Secure owner login
* Protected owner routes
* JWT-based authentication
* Logout functionality
* Change password
* Forgot password functionality
* Password reset flow

### 📊 Owner Dashboard

The owner can manage portfolio content without directly modifying the frontend code.

CRUD functionality includes:

* Portfolio information
* Projects
* Skills
* Experience
* Education
* Certificates and achievements
* Reviews/ratings

### ☁️ Media Management

* Cloudinary integration
* Image uploads
* Video uploads
* Portfolio media management
* Resume/document handling

### 🔎 SEO

The portfolio includes basic search-engine optimization:

* SEO-friendly page title
* Meta description
* Canonical URL
* Open Graph metadata
* Twitter/X metadata
* Structured data using JSON-LD
* `robots.txt`
* `sitemap.xml`
* Semantic HTML structure
* Image `alt` attributes

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Tailwind CSS
* Lucide React
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* JavaScript
* REST APIs
* JWT Authentication
* bcrypt
* CORS
* dotenv

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Media & Services

* Cloudinary
* Email service for password reset functionality

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database
* Cloudinary — Media storage

---

## 📁 Project Structure

```text
sachin_jadaun-portfolio/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas account
* Cloudinary account

---

## 1. Clone the Repository

```bash
git clone https://github.com/sachinjadaun113/sachin_jadaun-portfolio.git
```

```bash
cd sachin_jadaun-portfolio
```

---

# 🖥️ Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=http://localhost:5173

# Add your email/password-reset variables if required
```

**Never commit your `.env` file or secret credentials to GitHub.**

Start the backend:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will normally run on:

```text
http://localhost:5000
```

---

# 🔗 Frontend ↔ Backend

The frontend communicates with the Express backend through REST APIs.

Example:

```text
React Frontend
      │
      │ Axios / HTTP Requests
      ▼
Express REST API
      │
      ▼
MongoDB Atlas
```

Media files are handled through Cloudinary.

---

# 🔐 Authentication Flow

The application includes protected owner functionality.

```text
Owner Login
     ↓
Authentication
     ↓
JWT Token
     ↓
Protected Routes
     ↓
Owner Dashboard
```

Protected owner sections include:

* Dashboard
* Portfolio management
* Project management
* Skills management
* Experience management
* Education management
* Certificates & achievements
* Reviews
* Change password

---

# 📡 API

The backend provides RESTful APIs for portfolio management.

Typical operations include:

```text
GET       Fetch portfolio data
POST      Create portfolio data
PUT/PATCH Update portfolio data
DELETE    Delete portfolio data
```

Authentication-protected endpoints are used for owner management operations.

---

# 🌍 Deployment

## Frontend — Vercel

The React/Vite frontend can be deployed using Vercel.

Production environment variable:

```env
VITE_BASE_URL=https://your-render-backend.onrender.com/api
```

## Backend — Render

The Node.js/Express backend can be deployed using Render.

Production environment variables should include:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-vercel-frontend.vercel.app
```

## Database — MongoDB Atlas

MongoDB Atlas is used for persistent portfolio and authentication-related data.

## Media — Cloudinary

Cloudinary is used for storing and serving portfolio images, videos, and other supported media.

---

# 📱 Responsive Design

The portfolio is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

Responsive testing is performed before final deployment.

---

# 🔎 SEO

The project includes:

* Semantic HTML
* SEO title
* Meta description
* Canonical URL
* Open Graph metadata
* Twitter/X metadata
* JSON-LD structured data
* `robots.txt`
* `sitemap.xml`
* Image alternative text
* Search-engine-friendly content structure

---

# 🔒 Security

Security considerations implemented in the project include:

* Protected owner routes
* JWT authentication
* Password hashing
* Environment variables for sensitive credentials
* CORS configuration
* Authentication middleware
* Sensitive credentials excluded from Git

---

# 📸 Screenshots

Add screenshots of the major sections here after deployment.

Suggested screenshots:

1. Homepage
2. Projects section
3. Skills section
4. Owner dashboard
5. Project management
6. Mobile responsive view

---

# 📌 Future Improvements

Possible future improvements include:

* Advanced SEO optimization
* Google Search Console integration
* Additional performance optimization
* More detailed project pages
* Improved analytics
* Additional accessibility improvements
* Further responsive refinements

---

# 👨‍💻 Author

## Sachin Kumar

**B.Tech — Computer Science & Engineering**
**AKTU**

### Technologies

React • Node.js • Express.js • MongoDB • Java • Spring Boot

### GitHub

https://github.com/sachinjadaun113

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
