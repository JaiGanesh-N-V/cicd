import { userModel } from '../models/user.model.js';
import UserLoginService from '../services/login.js';
import UserSignupService from '../services/signup.js';
import { Product } from '../models/products.model.js';
import getCategoryService from '../services/getCategory.js';
import { logger } from '../logger/logger.js';
import GetUserListService from '../services/getUserList.js';
import { orderModel } from '../models/order.model.js';
import orderDetailsService from '../services/orderDetails.js';
import getOrdersService from '../services/getOrders.js';
import adminOrderStatusService from '../services/adminOrderStatus.js';
import GetOtpService from '../services/getOtp.js';

const loginUser = async (req, res) => {
  logger.info(`Login api Executing`);
  const userLoginService = new UserLoginService(userModel);
  const responseMessage = await userLoginService.login(req);
  logger.info(`Login api Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const signupUser = async (req, res) => {
  logger.info(`Signup api Executing`);
  const userSignupService = new UserSignupService(userModel);
  const responseMessage = await userSignupService.signup(req);
  logger.info(`Signup api Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const dummy = async (req, res) => {
  logger.info(`dummy api Executing`);
  logger.info(req.body);
  logger.info(`dummy api Executed`);
  res.status(200).json(req.body);
};

const getUsers = async (req, res) => {
  logger.info('GetUsers API Executing');
  const getUserListService = new GetUserListService(userModel);
  const responseMessage = await getUserListService.getUserList(req);
  res.status(responseMessage.status).json(responseMessage);
  logger.info('GetUsers API Executed');
};

const getCategory = async (req, res) => {
  logger.info('getCategory api is Executing');
  const getCategoryservice = new getCategoryService(Product);
  const responseMessage = await getCategoryservice.Category(req);
  logger.info('getCategory api is executed');
  res.status(responseMessage.status).json(responseMessage);
};

const orderDetails = async (req, res) => {
  logger.info('orderDetails api is executing');
  const orderDetailService = new orderDetailsService(orderModel);
  const responseMessage = await orderDetailService.order(req);
  logger.info('orderFDetails api is executed');
  res.status(responseMessage.status).json(responseMessage);
};

const getOrderDetails = async (req, res) => {
  logger.info('getOrder Api is executing');
  const getOrderDetailsService = new getOrdersService(orderModel);
  const responseMessage = await getOrderDetailsService.getOrder(req);
  res.status(responseMessage.status).json(responseMessage);
  logger.info('getOrders api is executed');
};

const updateAdminOrderStatus = async (req, res) => {
  logger.info('update status api is executing');
  const updateOrderStatus = new adminOrderStatusService(orderModel);
  const responseMessage = await updateOrderStatus.orderStatus(req);
  res.status(responseMessage.status).json(responseMessage);
  logger.info('updateadmin status api is executed');
};

const otpToResetPassword = async (req, res) => {
  logger.info('Get OTP service is executing');
  console.log(req.method);
  const getOtpService = new GetOtpService(userModel);
  let responseMessage;
  if (req.method === 'GET') {
    responseMessage = await getOtpService.getOtp(req);
  } else responseMessage = await getOtpService.verifyOtpAndSavePassword(req);
  res.status(responseMessage.status).json(responseMessage);
  logger.info('Get OTP service is executing');
};

export {
  loginUser,
  dummy,
  getUsers,
  signupUser,
  getCategory,
  orderDetails,
  getOrderDetails,
  updateAdminOrderStatus,
  otpToResetPassword,
};
