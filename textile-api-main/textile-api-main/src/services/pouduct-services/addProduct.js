import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export default class PostProductService {
  #productConnection;
  constructor(productConnection) {
    this.#productConnection = productConnection;
  }

  addProduct = async req => {
    try {
      logger.info('checking whether the product Id is already Exists');
      let productidexists = await this.#productConnection.findOne({
        productId: req.body.productId,
      });
      
      if (productidexists) {
        return sendResponse(CODES.BAD_REQUEST, 'Please enter different product Id');
      }
      if (
        !req.body.productId ||
        !req.body.productName ||
        !req.body.category ||
        !req.body.qualityParameters ||
        !req.body.packingType ||
        !req.body.quantity ||
        !req.body.priceForAgent ||
        !req.body.gstPriceForBuyer ||
        !req.body.imageUrl
      ) {
        return sendResponse(CODES.BAD_REQUEST, 'All the fileds are Mandatory');
      }

      //AWS S3 implemenntation to add the image.
      // const client = new S3Client({
      //   credentials: {
      //     accessKeyId: process.env.ACCESS_KEY,
      //     secretAccessKey: process.env.SECRET_ACCESS_KEY,
      //   },
      //   region: process.env.BUCKER_REGION,
      // });
      // const command = new PutObjectCommand({
      //   Body: req.imageFile.buffer,
      //   Bucket: process.env.BUCKET_NAME,
      //   Key: `productImages/${req.imageFile.originalname}`,
      //   ContentType: req.imageFile.mimetype,
      // });

      // client.send(command)
      // .than((data)=>{console.log(data)
      // })
      // .catch((err)=>{
      //   console.log(err);
      // })
      let product = await new this.#productConnection({
        productId: req.body.productId,
        productName: req.body.productName,
        category: req.body.category,
        qualityParameters: req.body.qualityParameters,
        packingType:req.body.packingType,
        quantity: req.body.quantity,
        priceForAgent: req.body.priceForAgent,
        gstPriceForBuyer: req.body.gstPriceForBuyer,
        imageUrl: req.body.imageUrl,
      }).save();
      return sendResponse(CODES.OK, 'Product added successfully');
    } catch (error) {
      logger.error(error);
      throw new Error('Error in adding product');
    }
  };
}
