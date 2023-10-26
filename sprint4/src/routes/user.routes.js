import { Router } from 'express';
import * as userController from '../controllers/users.controller.js';

const router = Router();

router.get('/', userController.getAllUsers);

router.post('/signup', userController.createUser);

router.get('/:userId', userController.getUserById);

router.patch('/update/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserById);


export default router;