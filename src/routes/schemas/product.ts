import Joi from "joi";

export default {
  getProductById: Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Product ID must be a number",
      "number.integer": "Product ID must be an integer",
      "any.required": "Product ID is required",
    }),
  }),
  getProductsList: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().optional(),
  }),
  createProduct: Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().optional(),
    price: Joi.number().positive().required(),
  }),
  updateProduct: Joi.object({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(3).optional(),
      description: Joi.string().optional(),
      price: Joi.number().positive().optional(),
    }),
  }),
  deleteProduct: Joi.object({
    id: Joi.number().integer().required(),
  }),
};
