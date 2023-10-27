import { Router } from 'express';
import * as purchasesCtrl from '../controllers/purchases.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware.userCredentials, purchasesCtrl.createPurchaseHistory);

export default router;