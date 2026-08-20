require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./Router/userRouter');
const app = express();
const cors = require('cors');
const { postRouter } = require('./Router/postRouter');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// // Enable CORS for frontend
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });


// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-app';
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/data', postRouter);


// // Health check endpoint
// app.get('/api/health', (req, res) => {
//     res.json({ success: true, message: 'Server is running' });
// });


// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});