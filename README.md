# 🥤 DAFresh_Juice_Store

A modern full-stack MERN (MongoDB, Express.js, React, Node.js) web application for an online juice store. The project features a responsive customer storefront, secure user authentication, shopping cart management, and an admin dashboard for managing products and users.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Secure Password Hashing
- Browse Juice Products
- Product Details
- Add to Cart
- Update Cart Quantity
- Remove Cart Items
- Persistent User Cart
- Responsive UI
- Protected User Routes

---

### 🛠️ Admin Features

- Secure Admin Login
- Dashboard Overview
- User Management
- Product Management
- Add Products
- Edit Products
- Delete Products
- View Store Statistics
- Protected Admin Routes

---

## 🏗️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Swagger API Documentation

---

## 📂 Project Structure

```
PRODUCT/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/da-fresh.git

cd da-fresh
```

---

## 2. Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_ORIGIN=http://localhost:5173

ADMIN_NAME=Admin

ADMIN_EMAIL=admin@example.com

ADMIN_PASSWORD=yourpassword
```

Start Backend

```bash
npm run dev
```

or

```bash
npm start
```

Backend runs at

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🌱 Seed Database

Create the first admin account.

```bash
npm run seed:admin
```

Seed sample products.

```bash
npm run seed:products
```

---

# 📖 API Documentation

Swagger documentation is available after starting the backend.

```
http://localhost:5000/api/docs
```

OpenAPI JSON

```
http://localhost:5000/api/docs.json
```

---

# 🔐 Authentication

The application uses:

- JWT Authentication
- Password Hashing (bcryptjs)
- Protected User Routes
- Protected Admin Routes
- Role-Based Authorization

---

# 🛒 Main API Routes

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |

---

## Products

| Method | Endpoint |
|---------|----------|
| GET | `/api/products` |
| GET | `/api/products/:id` |

---

## Cart

| Method | Endpoint |
|---------|----------|
| GET | `/api/cart` |
| POST | `/api/cart/items` |
| PUT | `/api/cart/items/:productId` |
| DELETE | `/api/cart/items/:productId` |
| DELETE | `/api/cart` |
| POST | `/api/cart/merge` |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | `/api/admin/dashboard` |
| GET | `/api/admin/users` |
| GET | `/api/admin/products` |
| POST | `/api/admin/products` |
| PUT | `/api/admin/products/:id` |
| DELETE | `/api/admin/products/:id` |

---

# 📱 Screens

- Home Page
- Product Listing
- Product Details
- Login / Register
- Shopping Cart
- Admin Dashboard
- Product Management
- User Management

---

# 💻 Available Scripts

## Backend

```bash
npm run dev
npm start
npm run seed:admin
npm run seed:products
```

## Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

# 🌟 Future Improvements

- Payment Gateway Integration
- Wishlist
- Order History
- Product Search
- Product Filters
- Reviews & Ratings
- Email Notifications
- Image Upload
- Inventory Management

---

# 📄 License

This project is intended for educational and learning purposes.

---

# 👨‍💻 Author

**Akilen J K
  Abhijith S
  Devananth R S**

Full Stack Developer

Made with ❤️ using the MERN Stack.
