import express from 'express';
import { createTodo, getTodos } from '../controllers/todoController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, createTodo);
router.get('/', authenticate, getTodos);

export default router;
