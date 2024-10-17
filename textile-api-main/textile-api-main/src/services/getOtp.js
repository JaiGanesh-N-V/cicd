import { sendResponse } from '../common/common.js';
import { mailObj, transporter } from '../common/mail.config.js';
import bcrypt from "bcrypt";

export default class GetOtpService {
  #userConnection;
  constructor(userConnection) {
    this.#userConnection = userConnection;
  }
  getOtp = async req => {
    try {
      console.log(req.query);
      const user = await this.#userConnection.findOne({ email: req.query.email });
      if (!user) return sendResponse(400, 'User Not Found');
      let otp = Math.floor(100000 + Math.random() * 900000);
      user.otp = otp;
      user.expireTime = Date.now() + 15 * 60 * 1000;
      user.save();
      await transporter
        .sendMail(
          await mailObj({
            subject: 'OTP to reset Password',
            content: `Use this OTP to reset the password: ${otp}`,
            mailto:user.email
          })
        )
        .then(() => {
          console.log('otp sent successfully');
        });
      return sendResponse(200, 'otp sent');
    } catch (error) {
      throw new Error(`Error in getting OTP`);
    }
  };

  verifyOtpAndSavePassword = async req => {
    try {
      console.log(req.body);
      const { email, otp, newPassword } = req.body;

      if (!email || !otp) {
        return sendResponse(400, 'Please Enter OTP and Mail');
      }

      const user = await this.#userConnection.findOne({
        email,
        otp,
        expireTime: { $gt: Date.now() },
      });

      if (!user) {
        return sendResponse(400, 'Invalid OTP or OTP has expired');
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);

      await this.#userConnection.findOneAndUpdate(
        { email },
        { $set: { otp: '', expireTime: '', hashPassword: hashPassword } },
        { new: true }
      );
      return sendResponse(200, 'OTP Verified Successfully and New Password has been Set!!!!!!!!');
    } catch (error) {
      throw new Error('Error in verifying OTP');
    }
  };
}
