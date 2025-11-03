import express from 'express';
import { registerUser, loginUser, getUserById, getUserResumes } from '../controler/userControler.js';
import protect from '../middlewares/authMiddleware.js'; // CHANGED: middleware to middlewares

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes); // CHANGED: getUserById to getUserResumes

export default userRouter;