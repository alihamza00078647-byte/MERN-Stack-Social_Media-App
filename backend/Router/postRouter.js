const express = require('express');
const { createPost } = require('../Controller/postController');
const { upload } = require('../Middlewares/multer');
const { verifyToken } = require('../Middlewares/authMiddleware');
const postRouter = express.Router();



postRouter.post('/create-posts', verifyToken, upload.single('image'), createPost);




exports.postRouter = postRouter;