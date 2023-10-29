import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', userController.getAllUsers);

router.post('/signup', authMiddleware.roleValidation, userController.createUser);

router.get('/:userId', userController.getUserById);

router.patch('/update/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserById);


export default router;