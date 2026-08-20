const express = require('express');
const { createPost } = require('../Controller/postController');
const postRouter = express.Router();



postRouter.post('/create-posts', createPost);




exports.postRouter = postRouter;