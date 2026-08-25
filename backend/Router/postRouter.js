const express = require('express');
const { createPost } = require('../Controller/postController');
const { verifyToken } = require('../Middlewares/authMiddleware');
const uploadMedia = require('../Middlewares/uploadMedia');
const postRouter = express.Router();



postRouter.post('/create-posts', verifyToken, uploadMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]), createPost);


exports.postRouter = postRouter;