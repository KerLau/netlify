import express from 'express';
import { userLogin } from './userController.js';
import authMiddleware from './authMiddleware.js';
import errorMiddleware from './errorMiddleware.js';

const router = express.Router();

router.post('/login', authMiddleware, userLogin, errorMiddleware);

export default router;
