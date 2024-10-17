import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';

export default class UpdateProductService {
  #productConnection;
  constructor(productConnection) {
    this.#productConnection = productConnection;
  }

  updateProduct = async (req, res) => {
    try {
      const {
        productId,
        productName,
        category,
        qualityParameters,
        quantity,
        priceForAgent,
        gstPriceForBuyer,
      } = req.body;
  
      if (!productId) {
        return sendResponse(res, CODES.BAD_REQUEST, 'Send Product Id ');
      }
  
      const allowedFields = {
        productId,
        productName,
        category,
        qualityParameters,
        quantity,
        priceForAgent,
        gstPriceForBuyer,
      };
  
      // Filter the details to only include allowed fields
      const filteredDetails = {};
      Object.keys(allowedFields).forEach(key => {
        if (allowedFields[key] !== undefined) {
          filteredDetails[key] = allowedFields[key];
        }
      });
  
      const filter = { productId: productId };
  
      const updatedProduct = await this.#productConnection.findOneAndUpdate(
        filter,
        filteredDetails,
        {
          new: true,
        }
      );
  
      if (!updatedProduct) {
        return sendResponse(CODES.NOT_FOUND, 'Product not found');
      }
  
      return sendResponse(CODES.OK, 'Product updated successfully');
    } catch (error) {
      logger.error(error);
      return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in Update Product API');
    }
  };
  
}
