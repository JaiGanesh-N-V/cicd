import express from 'express';
import {
  deleteProducts,
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
} from '../controller/product.controller.js';
import { getDashboardData } from '../controller/dashboard.controller.js';
import { upload } from '../common/common.js';

const productRouter = express.Router();
productRouter.post('/addProduct', addProduct);
productRouter.post('/getProducts', getProduct);
productRouter.get('/getProductById', getProductById);
productRouter.post('/getDashboardData', getDashboardData);
productRouter.delete('/deleteProduct', deleteProducts);
productRouter.put('/updateProduct', updateProduct);

export { productRouter };
