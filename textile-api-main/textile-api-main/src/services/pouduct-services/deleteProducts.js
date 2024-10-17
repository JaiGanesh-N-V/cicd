import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';
export default class DeleteProductService {
  #productConnection;
  constructor(productConnection) {
    this.#productConnection = productConnection;
  }

  deleteProduct = async (req, res) => {
    try {
      logger.info('Checking for productId in query params');
      const { id } = req.query;

      if (!id) {
        return sendResponse(CODES.BAD_REQUEST, 'Send ProductID of the specific Product');
      }

      await this.#productConnection.deleteOne({ productId: id });
      return sendResponse(CODES.OK, 'Product deleted successfully');
    } catch (err) {
      logger.error(`Error in deleteProduct: ${err.message}`);
      return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in delete Product API Call');
    }
  };
}
