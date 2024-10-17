import { sendResponse } from "../common/common.js";
import { CODES } from "../common/response-code.js";
import { logger } from "../logger/logger.js";

export default class adminOrderStatusService{
    #adminOrderStatus
    constructor(adminOrderStatus){
        this.#adminOrderStatus=adminOrderStatus;
    }

    orderStatus=async req=>{
        try{
            logger.info(req.body);
            logger.info("checking the status");
            const order = await this.#adminOrderStatus.findOneAndUpdate(
                { orderId: req.body.orderId },
                { status: true },
                { new: true }
            );
            logger.info(order);

            if (!order) {
                return sendResponse(CODES.BAD_REQUEST, "Product Id is not available, please check");
            } else {
                return sendResponse(CODES.OK, order);
            }


        }
        catch(error){
            logger.error(error);
            throw error("Order Staus Api is not working")
        }

    }
}