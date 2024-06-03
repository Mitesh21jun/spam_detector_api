import { Router } from 'express';
import {
  searchByName,
  // searchByPhoneNumber,
  markAsSpam,
  checkSpam,
  addContact,
} from '../controllers/contactController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, addContact);
router.get('/search', authMiddleware, searchByName);
router.get('/spam', authMiddleware, checkSpam);
router.post('/spam', authMiddleware, markAsSpam);

export default router;
