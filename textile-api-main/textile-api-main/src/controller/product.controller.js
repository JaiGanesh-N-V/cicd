import { logger } from '../logger/logger.js';
import { Product } from '../models/products.model.js';
import GetProductService from '../services/pouduct-services/getProducts.js';
import PostProductService from '../services/pouduct-services/addProduct.js';

import GetProductByIdService from '../services/getProductById.js';
import DeleteProductService from '../services/pouduct-services/deleteProducts.js';
import UpdateProductService from '../services/pouduct-services/updateProduct.js';

const getProduct = async (req, res) => {
  logger.info(`Get product api Executing`);
  const getProductService = new GetProductService(Product);
  const responseMessage = await getProductService.getProductList(req);
  logger.info(`Get product api Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const getProductById = async (req, res) => {
  logger.info('Get Product By iD api is Executing');
  const getProductByIdService = new GetProductByIdService(Product);
  logger.info('Get Product By iD api is Executing');
  const responseMessage = await getProductByIdService.productById(req);
  logger.info(`Get Product By Id Api Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const addProduct = async (req, res) => {
  logger.info(`Post product api is Executing`);
  const postProductService = new PostProductService(Product);
  const responseMessage = await postProductService.addProduct(req);
  logger.info(`Post product api is Executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const deleteProducts = async (req, res) => {
  logger.info(`delete product api is executing`);
  const deleteProductService = new DeleteProductService(Product);
  const responseMessage = await deleteProductService.deleteProduct(req);
  logger.info(`delete product api is executed`);
  res.status(responseMessage.status).json(responseMessage);
};

const updateProduct = async (req, res) => {
  logger.info('Update Product API is Executing');
  const updateProductService = new UpdateProductService(Product);
  const responseMessage = await updateProductService.updateProduct(req);
  logger.info('Update Product API is Executed');
  res.status(responseMessage.status).json(responseMessage);
};

export { getProduct, addProduct, getProductById, deleteProducts, updateProduct };
