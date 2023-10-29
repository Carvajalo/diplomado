import * as SessionController from '../controllers/session.controller.js';
import { Router } from 'express';
import * as authMiddleware from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/login', SessionController.login);

router.post('/signup', authMiddleware.roleValidation, SessionController.signup);

export default router;
