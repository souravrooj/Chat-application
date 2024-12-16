import express from 'express';
import { getUser, addUser } from '../controllers/userController';

const router = express.Router();

router.get('/users/:email', getUser);
router.post('/users', addUser);

export default router;
