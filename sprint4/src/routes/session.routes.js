import * as SessionController from '../controllers/session.controller.js';
import { Router } from 'express';


const router = Router();

router.post('/login', SessionController.login);

export default router;
