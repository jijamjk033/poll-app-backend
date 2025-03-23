import express from 'express';
import userRoutes from './userRoutes';
import chatRoutes from './chatRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

export default router;