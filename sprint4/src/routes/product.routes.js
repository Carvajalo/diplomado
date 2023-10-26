import { Router } from 'express';

import * as productCtrl from '../controllers/product.controller.js';
import * as sessionCtrl from '../controllers/session.controller.js';
import * as mongoUtils from '../utils/mongo.utils.js';


const router = Router();

router.get('/', productCtrl.getAllProducts);

router.post('/', sessionCtrl.validateAdmin, productCtrl.createProduct);

router.get('/:productId', mongoUtils.validateMongoId, productCtrl.getProductById);

router.patch('/update/:productId', mongoUtils.validateMongoId,  sessionCtrl.validateAdmin, productCtrl.updateProductById);

router.delete('/delete/:productId', mongoUtils.validateMongoId, sessionCtrl.validateAdmin, productCtrl.deleteProductById);


export default router;