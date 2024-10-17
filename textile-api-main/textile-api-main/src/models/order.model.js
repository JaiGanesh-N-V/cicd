import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const productDetails = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  productName:{
    type: String,
    required: true,

  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  userEmail: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
    enum: ['AGENT', 'BUYER'],
  },
  category: {
    type: String,
    required: true,
  },
  products: [productDetails],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      'IN-CART', // In-cart when user adds item but payment process not started
      'INITIATED', // Payment details not entered by user
      'QUEUED', // Payment details entered but not approved by admin
      'VERIFIED', // Approved by admin
      'CANCELLED', // Cancelled by user
      'REJECTED', // Rejected by admin
    ],
    default: 'IN-CART',
  },
  createdOn: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });

const orderModel = mongoose.model('order', orderSchema);
export { orderModel };
