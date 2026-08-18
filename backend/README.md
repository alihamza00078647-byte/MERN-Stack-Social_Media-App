# Social Media App - Backend Authentication API

## 🔐 Authentication System

The backend implements secure user authentication with bcrypt password hashing and JWT token-based authorization.

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/social-media-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Start MongoDB

Ensure MongoDB is running locally or update `MONGODB_URI` in `.env` with your MongoDB connection string.

### 4. Start Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:3000`

---

## 🔗 API Endpoints

### **Register User**

**POST** `/api/user/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7a3c9d4e2f1a8b9c3d4e5",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

**Error Responses:**

- **400**: Invalid input or missing fields
- **409**: Email already registered
- **500**: Server error

---

### **Login User**

**POST** `/api/user/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f7a3c9d4e2f1a8b9c3d4e5",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null,
    "bio": ""
  }
}
```

**Error Responses:**

- **400**: Missing email or password
- **401**: Invalid credentials
- **500**: Server error

---

## 🔑 JWT Token Usage

After login/register, use the token for authenticated requests:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/protected-route
```

Token expires in **7 days**.

---

## 📊 User Model Schema

```javascript
{
    _id: ObjectId,
    name: String (required),
    email: String (required, unique, lowercase),
    password: String (required, hashed with bcrypt),
    avatar: String (default: null),
    bio: String (default: ""),
    createdAt: Date (auto),
    updatedAt: Date (auto)
}
```

### Field Validations:

- **name**: Required, trimmed
- **email**: Required, unique, lowercase, valid email format
- **password**: Required, minimum 6 characters, bcrypt hashed (10 salt rounds)
- **avatar**: Optional, stored as URL
- **bio**: Optional user biography

---

## 🔒 Security Features

### Password Hashing

- Uses **bcrypt** with 10 salt rounds
- Passwords never stored in plain text
- Password field excluded from queries by default (select: false)

### JWT Authentication

- Tokens include `userId` and `email`
- Tokens expire after 7 days
- Secret key configurable via `JWT_SECRET` environment variable

### Input Validation

- Email format validation using regex
- Password confirmation on registration
- Minimum password length (6 characters)
- Email uniqueness check
- Request data trimming and sanitization

---

## 🔌 Middleware

### Auth Middleware (`authMiddleware.js`)

Verify JWT tokens for protected routes:

```javascript
const { verifyToken } = require("./Middlewares/authMiddleware");

// Protect a route
app.get("/api/protected", verifyToken, (req, res) => {
  // req.userId and req.userEmail available
  res.json({ message: "Protected data", userId: req.userId });
});
```

---

## 📝 Error Handling

All endpoints return JSON responses with consistent format:

**Success:**

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🚀 Deployment Considerations

1. **Change JWT_SECRET** in production environment
2. **Use environment-specific MONGODB_URI**
3. **Enable HTTPS** for production
4. **Implement rate limiting** on auth endpoints
5. **Add input sanitization** for production
6. **Use secure cookie settings** if implementing session-based auth
7. **Enable CORS** properly for specific domains

---

## 📦 Dependencies

- **bcrypt** (^5.1.1): Password hashing
- **jsonwebtoken** (^9.1.2): JWT token generation and verification
- **mongoose** (^9.9.2): MongoDB ODM
- **express** (^5.2.1): Web framework
- **dotenv** (^17.4.2): Environment variables

---

## 🔧 Development

### Testing with cURL

Register:

```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📄 License

Part of the Social Media App MERN stack project.
