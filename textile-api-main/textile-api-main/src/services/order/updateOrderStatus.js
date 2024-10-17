import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';
import { mailObj, transporter } from '../../common/mail.config.js';

export default class UpdateOrderStatusService {
  #orderConnection;
  constructor(orderConnection) {
    this.#orderConnection = orderConnection;
  }

  updateStatus = async req => {
    try {
      const { orderId, status } = req.body;
      logger.info(`Updating status for orderId: ${orderId}`);

      if (!orderId || !status) {
        return sendResponse(CODES.BAD_REQUEST, 'OrderId and status are required');
      }

      let order = await this.#orderConnection.findOneAndUpdate(
        { orderId },
        { status },
        { new: true }
      );

      if (!order) {
        return sendResponse(CODES.BAD_REQUEST, 'Order not found');
      }
      if (order.status==="QUEUED"){
        await transporter
        .sendMail(
          await mailObj({
            subject: 'Your order placed',
            content: `Your order placed successfully`,
            mailto:order.userEmail,
          })
        )
      }
      return sendResponse(CODES.OK, 'Order status updated successfully');
    } catch (error) {
      logger.error(error);
      throw new Error('Error in updating order status');
    }
  };
}
