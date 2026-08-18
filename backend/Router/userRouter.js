const express = require('express');
const { Login, register } = require('../Controller/userController');
const userRouter = express.Router();


userRouter.post('/register', register);

userRouter.post('/login', Login);




exports.userRouter = userRouter;