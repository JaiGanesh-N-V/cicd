import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  qualityParameters: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceForAgent: {
    type: Number,
    required: true,
  },
  gstPriceForBuyer: {
    type: Number,
    required: true,
  },
  // image: {
  //   type: String,
  // },
  imageUrl: {
    type: String,
  },
});

const Product = model('product', productSchema);
export { Product };
