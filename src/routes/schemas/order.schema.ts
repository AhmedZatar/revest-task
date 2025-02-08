import Joi from "joi";

const uuidSchema = Joi.string().guid({version: "uuidv4"}).required().messages({
  "string.guid": "Invalid UUID format",
  "any.required": "ID is required",
});

export default {
  getOrderById: Joi.object({
    id: uuidSchema,
  }),
  getOrdersList: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
    search: Joi.string().optional(),
    fromOrderDate: Joi.date().iso().optional(),
    toOrderDate: Joi.date().iso().optional(),
  }),
  createOrder: Joi.object({
    customerName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(10).required(),
    products: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().integer().required(),
          quantity: Joi.number().integer().positive().required(),
        }),
      )
      .min(1)
      .required(),
  }),
  updateOrder: {
    params: Joi.object({
      id: uuidSchema,
    }),
    body: Joi.object({
      customerName: Joi.string().min(3).optional(),
      email: Joi.string().email().optional(),
      mobileNumber: Joi.string().min(10).optional(),
      status: Joi.string()
        .valid("PENDING", "CONFIRMED", "CANCELLED", "DELIVERED")
        .optional(),
    }),
  },
  deleteOrder: Joi.object({
    id: uuidSchema,
  }),
  removeOrderProduct: Joi.object({
    orderId: uuidSchema,
    productId: Joi.number().integer().required(),
  }),
  updateOrderProductQuantity: {
    params: Joi.object({
      orderId: uuidSchema,
      productId: Joi.number().integer().required(),
    }),
    body: Joi.object({
      quantity: Joi.number().integer().positive().required(),
    }),
  },
};
