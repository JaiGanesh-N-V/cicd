import { logger } from '../logger/logger.js';
import { sendResponse } from '../common/common.js';
import { CODES } from '../common/response-code.js';

export default class GetUserListService {
  #userConnection;
  constructor(userConnection) {
    this.#userConnection = userConnection;
  }
  getUserList = async req => {
    try {
      logger.info('Inside getUserList method');
      if (req.body?.search) {
        logger.info(`Search Key: ${req?.body?.search}`);
        logger.info(`Using Aggregate to filter based on search value`);
        // Define the search criteria
        const searchCriteria = {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
          ],
        };

        // Find the users
        const userList = await this.#userConnection.find(searchCriteria, {
          _id: 0,
          __v: 0,
          hashPassword: 0,
          wrongPasswordCount: 0,
          lockedTemp: 0,
        });
        return sendResponse(CODES.ACCEPTED, userList);
      }
      logger.info(`Using find to get list of all Users`);
      let userList = await this.#userConnection.find(
        {},
        { _id: 0, __v: 0, hashPassword: 0, wrongPasswordCount: 0, lockedTemp: 0 }
      );
      return sendResponse(CODES.OK, userList);
    } catch (error) {
      logger.error(error);
      throw new Error(`Error in Get User List API - ${error}`);
    }
  };
}
