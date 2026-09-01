const express = require('express');
const { createPost, userProfile, getAllPosts, likePost, deletePost } = require('../Controller/postController');
const { verifyToken } = require('../Middlewares/authMiddleware');
const uploadMedia = require('../Middlewares/uploadMedia');
const postRouter = express.Router();



postRouter.post('/create-posts', verifyToken, uploadMedia.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]), createPost);


postRouter.post('/profile', verifyToken, userProfile);

postRouter.get('/posts', verifyToken, getAllPosts);

postRouter.post('/like-post/:userId', verifyToken, likePost);

postRouter.delete('/delete-post/:postId', verifyToken, deletePost);

exports.postRouter = postRouter;