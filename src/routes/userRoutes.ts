import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.post('/login', userController.googleLogin.bind(userController) );
router.get('/searchUser', userController.searchUser.bind(userController) );

export default router;