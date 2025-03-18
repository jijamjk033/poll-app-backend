import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/login', userController.googleLogin );
router.get('/searchUser', userController.searchUser );

export default router;