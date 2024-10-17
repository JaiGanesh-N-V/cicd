import { sendResponse } from "../../common/common.js";
import { CODES } from "../../common/response-code.js";
import { logger } from "../../logger/logger.js";



export default class getOrderDetailService{
    #getOrder
    constructor(getOrder){
        this.#getOrder=getOrder
    }

    getOrderDetails=async req=>
        {
        try{
            logger.info(req.body);
            logger.info("checking whether the orders are available");
            const order=await this.#getOrder.find({orderId:req.body.orderId, userEmail:req.body.email});
            logger.info(order);
            if(!order|| !order.length){
                return sendResponse(CODES.BAD_REQUEST,"No orders available please check")
                
            }
            else if(order){
                return sendResponse(CODES.OK,order);
            }
            
         }
        catch(error){
            logger.error(error);
            throw error("getOrder Api is not working");

        }
    }
}

export {getOrderDetailService}