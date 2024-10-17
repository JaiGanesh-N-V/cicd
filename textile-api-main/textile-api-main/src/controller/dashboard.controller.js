import { logger } from "../logger/logger.js";
import { Product } from "../models/products.model.js";
import { userModel } from "../models/user.model.js";
import { orderModel } from "../models/order.model.js";
import getDashboardDataService from "../services/getDashboardData.js";


const getDashboardData = async (req, res) => {
    logger.info(`Get DashboardData api Executing`);
    const getDashboardService = new getDashboardDataService(Product,userModel,orderModel);
    const responseMessage = await getDashboardService.dashboardData(req);
    logger.info(`Get DashboardData api Executed`);
    res.status(responseMessage.status).json(responseMessage);
  };

  export {getDashboardData};