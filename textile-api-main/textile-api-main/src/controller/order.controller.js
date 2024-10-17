import { logger } from '../logger/logger.js';
import { orderModel } from '../models/order.model.js';
import AddOrderService from '../services/order/addOrder.js';
import UpdateOrderStatusService from '../services/order/updateOrderStatus.js';
import GetOrdersService from '../services/order/getOrders.js';
import deleteOrderService from '../services/order/deleteOrder.js';
import getOrderDetailService from "../services/order/getOrderDetails.js"
import { Product } from '../models/products.model.js';

const addOrder = async (req, res) => {
  logger.info(`Add Order API is Executing`);
  const addOrderService = new AddOrderService(orderModel, Product);
  const responseMessage = await addOrderService.addOrder(req);
  logger.info(`Add Order API is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const updateOrderStatus = async (req, res) => {
  logger.info(`Update Order Status API is Executing`);
  const updateOrderStatusService = new UpdateOrderStatusService(orderModel);
  const responseMessage = await updateOrderStatusService.updateStatus(req);
  logger.info(`Update Order Status API is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const getOrders = async (req, res) => {
  logger.info(`Get Orders API is Executing`);
  const getOrdersService = new GetOrdersService(orderModel);
  const responseMessage = await getOrdersService.getOrderList(req);
  logger.info(`Get Orders API is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const getOrderDetails = async (req, res) => {
  logger.info(`Get OrderDetail API is Executing`);
  const getOrdersService = new getOrderDetailService(orderModel);
  const responseMessage = await getOrdersService.getOrderDetails(req);
  logger.info(`Get Orders API is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const deleteOrder = async (req, res) => {
  logger.info(`Get Orders API is Executing`);
  const DeleteOrdersService = new deleteOrderService(orderModel);
  const responseMessage = await DeleteOrdersService.deleteOrder(req);
  logger.info(`Get Orders API is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};


export { addOrder, updateOrderStatus, getOrders, deleteOrder,getOrderDetails};
