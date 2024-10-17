import express from 'express';
import { authenticateJWT } from '../security/auth.js';
import {
  loginUser,
  signupUser,
  getUsers,
  getCategory,
  orderDetails,
  getOrderDetails,
  updateAdminOrderStatus,
  otpToResetPassword,
} from '../controller/user.controller.js';
import verifyJWTToken from '../middeleware/auth.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/signup', signupUser);
userRouter.post('/getCategory', verifyJWTToken, getCategory);
userRouter.post('/getUsers', verifyJWTToken, getUsers);
userRouter.post('/orderDetails', verifyJWTToken, orderDetails);
userRouter.post('/getOrderDetails',verifyJWTToken, getOrderDetails);
userRouter.put('/updateOrderStatus', verifyJWTToken, updateAdminOrderStatus);
userRouter.get('/getOTP', otpToResetPassword);
userRouter.post('/verifyOtp', otpToResetPassword);

export { userRouter };
