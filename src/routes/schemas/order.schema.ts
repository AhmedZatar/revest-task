import Joi from "joi";
import {OrderStatus} from "@prisma/client";

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
    search: Joi.string().optional().empty(""),
    fromOrderDate: Joi.date().iso().optional(),
    toOrderDate: Joi.date().iso().optional(),
    status: Joi.string()
      .valid(...Object.values(OrderStatus))
      .optional()
      .empty(""),
  }),
  createOrder: Joi.object({
    customerName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(10).max(14).required(),
    address: Joi.string().min(5).required(),
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
      address: Joi.string().min(5).optional(),
      status: Joi.string()
        .valid(...Object.values(OrderStatus))
        .optional(),
    }),
  },
  deleteOrder: Joi.object({
    id: uuidSchema,
  }),
};
