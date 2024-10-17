import { sendResponse } from '../common/common.js';
import { CODES } from '../common/response-code.js';
import { logger } from '../logger/logger.js';

export default class getCategoryService {
  #getCategory;
  constructor(getCategory) {
    this.#getCategory = getCategory;
  }

  Category = async req => {
    try {
      logger.info(req.body);
      logger.info('checking category is exists');
      const categoryExists = await this.#getCategory.find({ category: req.body.category });
      if (!categoryExists) {
        return sendResponse(CODES.OK, 'The Selected Category has no product to show');
      } else {
        return sendResponse(CODES.OK, categoryExists);
      }
    } catch (error) {
      logger.error(error);
      throw error('getCategory api is not executing');
    }
  };
}
