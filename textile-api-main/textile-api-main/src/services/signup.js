import { sendResponse } from '../common/common.js';
import { CODES } from '../common/response-code.js';
import { logger } from '../logger/logger.js';
import { generateAccessToken } from '../security/auth.js';

export default class UserSignupService {
  #userConnection;
  constructor(userConnection) {
    this.#userConnection = userConnection;
  }

  signup = async req => {
    try {
      logger.info(req.body);
      logger.info('checking whether username is already in db');
      let usernameExists = await this.#userConnection.findOne({ email: req.body?.email });
      logger.info(usernameExists);
      if (usernameExists) return sendResponse(CODES.BAD_REQUEST, 'Please use different email');
      // need to maintain same naming convention in front and back end for neat code
      let user = await new this.#userConnection({
        mobile: req.body.mobile,
        name: req.body.name,
        hashPassword: req.body.hashPassword,
        address: req.body.address,
        email: req.body.email,
        panNo: req.body.panNo,
        gstNo: req.body.gstNo,
        role: req.body.role, // agent buyer admin
      }).save();

      if (user) {
        const token = await generateAccessToken({
          username: user.name,
          email: user.email,
          role: user.role,
        });

        return sendResponse(CODES.OK, 'User signed up successfully', { token });
      }
    } catch (error) {
      logger.error(error);
      throw new Error('Error in Signup API Call');
    }
  };
}
