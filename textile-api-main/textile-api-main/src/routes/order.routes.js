import express from 'express';
import {
  addOrder,
  updateOrderStatus,
  getOrders,
  deleteOrder,
  getOrderDetails
} from '../controller/order.controller.js';

const orderRouter = express.Router();
orderRouter.post('/addOrder', addOrder);
orderRouter.put('/updateOrderStatus', updateOrderStatus);
orderRouter.get('/getOrders', getOrders);
orderRouter.delete('/deleteOrders', deleteOrder);
orderRouter.post('/getOrderDetails', getOrderDetails);

export { orderRouter };
