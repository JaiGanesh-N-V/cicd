import express from 'express';
import { userRouter } from './user.routes.js';
import { productRouter } from './product.routes.js';
import { orderRouter } from './order.routes.js';
import verifyJWTToken from '../middeleware/auth.js';
import { getReport } from '../controller/report.controller.js';
import {getInvoice} from '../controller/invoice.controller.js'

const router = express.Router();

router.use('/user', userRouter);
router.use('/product',verifyJWTToken, productRouter);
router.use('/order',verifyJWTToken, orderRouter);
router.post('/report', getReport);
router.post('/getPdf', getInvoice);

export { router };
