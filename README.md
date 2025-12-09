# **Airbnb Clone – Full-Stack MERN Project**
<img width="2880" height="1800" alt="Screenshot 2025-11-30 194200" src="https://github.com/user-attachments/assets/5eca3372-af76-4605-a7f4-21d19e8451d0" />


A fully-functional Airbnb-style booking platform built with the **MERN stack**, featuring user authentication, host management, listing creation, image handling, date-based booking logic, and a host admin dashboard.

This project was created as part of my capstone, and includes both frontend and backend fully deployed and integrated.

---

## 🚀 **Tech Stack**

### **Frontend**

* React.js
* React Router
* Axios
* Custom Hooks
* Vite
* CSS Modules

### **Backend**

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Middleware-based authorization (user, host)
* RESTful API architecture

---

## 🌍 **Features**

### **🔐 Authentication**

* Register / Login
* JWT-based auth
* Role-based authorization
* Host account support

---

### **🏡 Listings**

* Hosts can create, update, and delete listings
* Image grid gallery
* Dynamic cities & categories
* Public listings page for all users
* Each listing shows:

  * Title
  * Location
  * Price per night
  * Host info
  * Image gallery

---

### **📅 Booking System**

* Users can reserve listings
* Prevents overlapping bookings
* Calculates total cost
* Booking validation: dates, availability, user auth
* Hosts can view bookings made on *their listings*
* Users can view and manage their own bookings

---

### **🛠 Admin / Host Dashboard**

* Manage listings
* Update and delete listings
* View reservations for your properties
* Delete bookings as host
* Clean layout using reusable UI components

---

## 🧱 **API Routes Overview**

### **Auth**

```
POST /api/auth/register
POST /api/auth/login
```

### **Users**

```
GET /api/users/me
```

### **Listings**

```
GET /api/listings
POST /api/listings          (host only)
GET /api/listings/:id
PUT /api/listings/:id       (host only)
DELETE /api/listings/:id    (host only)
```

### **Bookings**

```
POST /api/bookings
GET /api/bookings/user/:id
GET /api/bookings/host/me
GET /api/bookings/:id
DELETE /api/bookings/:id    (user or host)
```

---

## 🧩 **Project Structure**

```
/backend
   /controllers
   /models
   /routes
   /middleware
   server.js

/frontend
   /src
      /components
      /pages
      /ui
      /hooks
      /api
```

---

## 🌐 **Deployment**

* **Frontend:** Vercel & Netlify
* **Backend:** Render
* CORS configured for production
* Environment variables stored securely

---

## 📸 **Screenshots**

*(Add them yourself — homepage, listing page, booking page, admin panel, etc.)*

---

## 📦 **Install & Run**

### Clone

```bash
git clone https://github.com/simplyyliam/Airbnb.git
cd Airbnb
```

### Backend Setup
> ⚠️ IMPORTANT  
> The backend folder in this repo is **not the one deployed on Render**.  
> The live backend used by this project is located here:  
> 👉 https://github.com/simplyyliam/airbnb-backend 
>  
> To run the app locally, make sure to clone and install that backend instead.

```bash
git clone https://github.com/simplyyliam/airbnb-backend.git
```

Create a `.env` file:

```
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
NODE_ENV=development
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 **What I Learned**

* Full MERN production workflow
* Handling complex state with custom hooks
* Secure role-based authentication
* Preventing booking conflicts
* Real deployment debugging (CORS, API prefixes, routing order 😭)

---

## ❤️ Final Notes

This project pushed me harder than any other — debugging CORS, booking logic, API routes, image generation, admin flow, and deployment. But it taught me a TON and made me much stronger as a full-stack developer.

---

If you want, I can:

* Add more sections
* Make it repsonsive (because it is not my appologies🙇)
* Add instructions for seeding the DB
  Just tell me!
