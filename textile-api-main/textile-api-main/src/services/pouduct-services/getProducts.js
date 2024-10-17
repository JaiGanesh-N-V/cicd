import { sendResponse } from '../../common/common.js';
import { CODES } from '../../common/response-code.js';
import { logger } from '../../logger/logger.js';

export default class GetProductService {
  #productConnection;
  constructor(productConnection) {
    this.#productConnection = productConnection;
  }

  getProductList = async req => {
    try {
      let productList = await this.#productConnection.find(
        {},
        { _id: 0, __v: 0, productReadyBy: 0 }
      );
      // const client = new S3Client({
      //   credentials: {
      //     accessKeyId: process.env.ACCESS_KEY,
      //     secretAccessKey: process.env.SECRET_ACCESS_KEY,
      //   },
      //   region: process.env.BUCKER_REGION,
      // });
      // for (let list of productList) {
      //   let getObjectParams = {
      //     Key: `productImages/${list.image}`,
      //     Bucket: process.env.BUCKET_NAME,
      //   };
      //   const command = new GetObjectCommand(getObjectParams);
      //   const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      //   list.imageUrl = url;
      // }

      return sendResponse(CODES.OK, productList);
    } catch (error) {
      logger.error(error);
      throw new Error('Error in Update Product Api');
    }
  };
}
