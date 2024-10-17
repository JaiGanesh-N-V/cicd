import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';

export default class GetOrdersService {
  #orderConnection;
  constructor(orderConnection) {
    this.#orderConnection = orderConnection;
  }

  getOrderList = async req => {
    try {
      logger.info('Fetching orders list');

      const { status, userType } = req.query;
      let filter = {};

      if (status) {
        filter.status = status;
      }
      if (userType) {
        filter.userType = userType;
      }

      let orders = await this.#orderConnection.find(filter);
      
      return sendResponse(CODES.OK, orders);
    } catch (error) {
      logger.error(error);
      throw new Error('Error in fetching orders');
    }
  };
}
