import { sendResponse } from "../common/common.js";
import { CODES } from "../common/response-code.js";
import { logger } from "../logger/logger.js";

export default class  orderDetailsService
{
    #orderDetails;
    constructor(orderDetails){
        this.#orderDetails=orderDetails
    }

    order=async req=>{
        try{
            logger.info(req.body);
            logger.info("ordered product is storing to db");
            let  saveOrderedProducts=await new this.#orderDetails(
                {
                    products:req.body.products,
                    orderId:req.body.orderId,
                    // totalQuantity:req.body.totalQuantity,
                    totalPrice:req.body.totalPrice,
                    status:req.body.status

                }
            ).save();
            return sendResponse(CODES.OK,saveOrderedProducts)

        }
        catch(error){
            logger.error(error);
            throw error("Error in orderDetails API");
        }

    }
}

