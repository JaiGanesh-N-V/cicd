import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    gstNo: {
      type: String,
    },
    panNo: {
      type: String,
    },
    registeredOn: {
      type: Date,
    },
    lastupdatedOn: {
      type: Date,
    },
    lastLoggedIn: {
      type: Date,
    },
    wrongPasswordCount: {
      type: Number,
      default: 0,
    },
    lockedTemp: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'AGENT', 'BUYER'],
    },
    otp: {
      type: Number,
    },
    expireTime: {
      type: Number,
    },
  },
  { autoCreate: false }
);

// Virtual for password to hash it before saving to the database
// userSchema.virtual('password').set(function (password) {
//   this.hashPassword = bcrypt.hashSync(password, 10);
// });

// Method to authenticate a user
// userSchema.methods.authenticate = function (password) {
//   return bcrypt.compareSync(password, this.hashPassword);
// };
userSchema.pre("save", async function (next) {
  if (!this.isModified("hashPassword")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashPassword = await bcrypt.hash(this.hashPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model('User', userSchema); //1st argument --> name of the collection

export { userModel };
