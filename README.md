# 🍽️ Restaurant Management Microservice System

A full-stack microservices-based restaurant management system built using the **MERN stack (MongoDB, Express, React, Node.js)** with **TypeScript**.

This project enables restaurant owners to:

* Register and authenticate securely
* Create and manage restaurants
* Select restaurant location via an interactive map
* Create a menu card per restaurant
* Manage menu items (add, edit, delete)

---

# 🧱 Architecture Overview

This system follows a **microservices architecture**:

```
Restaurant Frontend Service (React + Vite + Tailwind)
        ↓
Restaurant Service (Node.js + Express + MongoDB)
        ↓
MongoDB Atlas (Cloud Database)
```

---

# ⚙️ Tech Stack

## Frontend

* React (Vite)
* TypeScript
* Tailwind CSS (v4)
* Axios
* React Router DOM
* Leaflet + React-Leaflet (Map picker)

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

## Database

* MongoDB Atlas (Cloud)

---

# 🚀 Features

## 🔐 Authentication

* Owner registration
* Owner login
* JWT-based authentication
* Protected routes

## 🏪 Restaurant Management

* Create restaurant
* View all restaurants (owner-specific)
* Update restaurant details
* Delete restaurant
* Toggle open/closed status

## 🗺️ Map Integration

* Interactive map using Leaflet
* Click to select restaurant location
* Latitude & longitude stored in database

## 📋 Menu System

* One menu card per restaurant
* Create menu card
* Add menu items
* Edit menu items
* Delete menu items
* Group items by category

## 🎨 UI/UX

* Clean, modern UI inspired by delivery platforms (Uber Eats style)
* Responsive design
* Modal-based workflows
* Dashboard-style layout

---

# 📁 Project Structure

## Frontend (`restaurant-frontend-service`)

```
src/
├── api/
├── components/
│   ├── restaurant/
│   ├── menu/
│   └── common/
├── pages/
├── context/
├── hooks/
├── types/
└── utils/
```

## Backend (`restaurant-service`)

```
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.ts
```

---

# 🔌 API Endpoints

## Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

## Restaurants

* `POST /api/restaurants`
* `GET /api/restaurants`
* `GET /api/restaurants/:id`
* `PUT /api/restaurants/:id`
* `DELETE /api/restaurants/:id`

## Menu

* `POST /api/restaurants/:id/menu-card`
* `GET /api/restaurants/:id/menu-card`
* `POST /api/restaurants/:id/menu-items`
* `GET /api/restaurants/:id/menu-items`
* `PUT /api/restaurants/:id/menu-items/:itemId`
* `DELETE /api/restaurants/:id/menu-items/:itemId`

---

# 🧪 How to Run the Project

## 1️⃣ Clone the repository

```
git clone <your-repo-url>
```

---

## 2️⃣ Backend Setup

```
cd restaurant-service
npm install
```

Create `.env` file:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

## 3️⃣ Frontend Setup

```
cd restaurant-frontend-service
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🧠 Key Design Decisions

* **One owner → multiple restaurants**
* **One restaurant → one menu card**
* **Menu items linked via menu card + restaurant**
* **JWT-based authorization per owner**
* **Map-based location selection for accuracy**
* **Frontend-driven validation for faster UX**

---

# ⚠️ Limitations (Current Version)

* No image upload for dishes
* No pagination or filtering
* No role-based multi-user system
* Minimal validation layer (no Joi/Zod yet)
* No deployment (local environment)

---

# 🔮 Future Improvements

* Add image upload for dishes
* Implement search and filters
* Add analytics dashboard
* Improve validation and error handling
* Dockerize services
* Deploy to cloud (Vercel + Render/AWS)

---

# 🎯 Conclusion

This project demonstrates:

* Microservices-based architecture
* Full CRUD operations
* Secure authentication system
* Real-world UI/UX patterns
* Integration of maps into web applications

It provides a strong foundation for scalable food delivery or restaurant management platforms.

---

# 👨‍💻 Author

Developed as part of a microservices-based application project using the MERN stack.

---
