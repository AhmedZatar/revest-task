import {Router} from "express";
import {schemaValidator} from "../middlewares";
import {orderSchema} from "./schemas";

const router = Router();

router.get(
  "/:id",
  schemaValidator(orderSchema.getOrderById, "params"),
  (req, res) => {
    res.send("Order by ID");
  },
);
router.get(
  "/",
  schemaValidator(orderSchema.getOrdersList, "query"),
  (req, res) => {
    res.send("Orders list");
  },
);
router.post(
  "/",
  schemaValidator(orderSchema.createOrder, "body"),
  (req, res) => {
    res.send("Create order");
  },
);
router.put(
  "/:id",
  schemaValidator(orderSchema.updateOrder.params, "params"),
  schemaValidator(orderSchema.updateOrder.body, "body"),
  (req, res) => {
    res.send("Update order");
  },
);
router.delete(
  "/:id",
  schemaValidator(orderSchema.deleteOrder, "params"),
  (req, res) => {
    res.send("Delete order");
  },
);
router.delete(
  "/:orderId/product/:productId",
  schemaValidator(orderSchema.removeOrderProduct, "params"),
  (req, res) => {
    res.send("Remove order product");
  },
);
router.patch(
  "/:orderId/product/:productId",
  schemaValidator(orderSchema.updateOrderProductQuantity.params, "params"),
  schemaValidator(orderSchema.updateOrderProductQuantity.body, "body"),
  (req, res) => {
    res.send("Update order product quantity");
  },
);

export default router;
