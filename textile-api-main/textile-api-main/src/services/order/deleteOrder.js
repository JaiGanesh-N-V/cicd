import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';
export default class deleteOrderService {
  #orderConnection;
  constructor(orderConnection) {
    this.#orderConnection = orderConnection;
  }

  deleteOrder = async (req, res) => {
    try {
      logger.info('Checking for orderId in query params');
      const { id } = req.query;

      if (!id) {
        return sendResponse(CODES.BAD_REQUEST, 'Send OrderID of the specific Order');
      }

      await this.#orderConnection.deleteOne({ orderId: id });
      return sendResponse(CODES.OK, 'Order deleted successfully');
    } catch (err) {
      logger.error(`Error in deleteOrder: ${err.message}`);
      return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in delete Order API Call');
    }
  };
}
