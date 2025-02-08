import {Router} from "express";

import {schemaValidator} from "../middlewares";
import {orderSchema} from "./schemas";
import {orderController} from "../controllers";

const router = Router();

router.get(
  "/:id",
  schemaValidator(orderSchema.getOrderById, "params"),
  orderController.getById,
);
router.get(
  "/",
  schemaValidator(orderSchema.getOrdersList, "query"),
  orderController.getList,
);
router.post(
  "/",
  schemaValidator(orderSchema.createOrder, "body"),
  orderController.create,
);
router.put(
  "/:id",
  schemaValidator(orderSchema.updateOrder.params, "params"),
  schemaValidator(orderSchema.updateOrder.body, "body"),
  orderController.update,
);
router.delete(
  "/:id",
  schemaValidator(orderSchema.deleteOrder, "params"),
  orderController.delete,
);

export default router;
