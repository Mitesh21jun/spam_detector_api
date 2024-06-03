import { Router } from 'express';
import { getUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, getUser);

export default router;
