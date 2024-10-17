import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';

export default class AddOrderService {
  #orderConnection;
  #productConnection;
  constructor(orderConnection, productConnection) {
    this.#orderConnection = orderConnection;
    this.#productConnection = productConnection;
  }

  addOrder = async (req, res) => {
    try {
      logger.info(req.body);
      logger.info('Adding a new order');

      const { user, products, status } = req.body;

      let totalPrice = 0;

      // Iterate through each product in the request body
      for (const product of products) {
        const productId = product.productId;
        const quantity = product.quantity;

        // Fetch the product details from the product collection
        console.log({ productId });
        const productDetails = await this.#productConnection.findOne({ productId: Number(productId) });
        console.log(productDetails, '#15');
        if (!productDetails) {
          return sendResponse(CODES.BAD_REQUEST, 'Invalid product ID');
        }

        // Determine the price based on user type
        const price =
          user.role === 'AGENT'
            ? productDetails.priceForAgent
            : productDetails.gstPriceForBuyer;
        const productTotalPrice = price * quantity;
        const productName = productDetails.productName;
        const category = productDetails.category;

        // Add the calculated price to the product object
        product.price = price;
        product.totalPrice = productTotalPrice;
        product.productName=productName;
        product.category = category;

        // Accumulate the total price
        totalPrice += productTotalPrice;
      }

      // Create the new order with the calculated total price
      let order = await new this.#orderConnection({
        userEmail: user.email,
        userType: user.role,
        category:products[0].category,
        products,
        totalPrice,
        status,
        createdOn: Date.now(),
        // orderId
      }).save();
      console.log(order);

      return sendResponse(CODES.OK, 'Order added successfully');
    } catch (error) {
      logger.error(error);
      return sendResponse(CODES.INTERNAL_SERVER_ERROR, 'Error in adding order');
    }
  };
}
