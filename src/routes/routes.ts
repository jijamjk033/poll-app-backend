import express from 'express';
import userRoutes from './userRoutes';
import chatRoutes from './chatRoutes';
import pollRoutes from './pollRoutes'

const router = express.Router();

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/poll', pollRoutes)

export default router;