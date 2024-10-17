import { encrypt, sendResponse } from '../common/common.js';
import { CODES } from '../common/response-code.js';
import { generateAccessToken, generateRefreshToken } from '../security/auth.js';
import { logger } from '../logger/logger.js';
import bcrypt from "bcrypt";

export default class UserLoginService {
  #userConnection;
  constructor(userConnection) {
    this.#userConnection = userConnection;
  }

  login = async req => {
    try {
      logger.info(`Checking if user exists or not`);
      const { email, password, role } = req.body;

      let userQuery = { email };
      if (role && role.toUpperCase() === 'ADMIN') {
        userQuery.role = 'ADMIN';
      } else {
        userQuery.role = { $ne: 'ADMIN' };
      }

      const user = await this.#userConnection.findOne(userQuery);
      console.log('-----', user);
      if (!user) {
        
        return sendResponse(CODES.UNAUTHORIZED, 'Invalid email');
      }

      const isMatch = await bcrypt.compare(password, user.hashPassword);
      console.log(isMatch)

      if (!isMatch) {
        return sendResponse(CODES.UNAUTHORIZED, "Invalid password");
      }

      const token = await generateAccessToken({
        username: user.name,
        email: user.email,
        role: user.role,
      });

      logger.info('Login Success!!!!');
      return sendResponse(CODES.OK, 'User logged in successfully', {
        token: token,
      });
    } catch (err) {
      logger.error(`${err}`);
      throw new Error('Error in login API Call');
    }
  };

  decryptAuth(authorization) {
    const b64auth = (authorization || '').split(' ')[1] || '';
    const strauth = Buffer.from(b64auth, 'base64').toString();
    const splitIndex = strauth.indexOf(':');
    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);
    return [login, password];
  }
}
