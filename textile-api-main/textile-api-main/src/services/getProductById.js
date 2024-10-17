import { sendResponse } from "../common/common.js";
import { CODES } from "../common/response-code.js";
import { logger } from "../logger/logger.js";

export default class GetProductByIdService{
    #ProductById
    constructor(productById){
        this.#ProductById=productById
    }
    productById=async req =>{
      try{
        logger.info(req.body);
        logger.info("checking whether the product Id is exists");
        const productExist=await this.#ProductById.find({ProductId:req.body.ProductId})
        if(!productExist||!productExist.length){
            return sendResponse(CODES.BAD_REQUEST,"please Enter Valid Product Id");
        }
        return sendResponse(CODES.OK,productExist)
      }
      catch(error){
        logger.error(error);
        throw error("Error in getting product By Is API")
      }


    }
} 