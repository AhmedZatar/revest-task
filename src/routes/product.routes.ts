import {Router} from "express";

import {schemaValidator} from "../middlewares";
import {productSchema} from "./schemas";
import {productController} from "../controllers";

const router = Router();

router.get(
  "/:id",
  schemaValidator(productSchema.getProductById, "params"),
  productController.getById,
);
router.get(
  "/",
  schemaValidator(productSchema.getProductsList, "query"),
  productController.getList,
);
router.post(
  "/",
  schemaValidator(productSchema.createProduct, "body"),
  productController.create,
);
router.put(
  "/:id",
  schemaValidator(productSchema.updateProduct.params, "params"),
  schemaValidator(productSchema.updateProduct.body, "body"),
  productController.update,
);
router.delete(
  "/:id",
  schemaValidator(productSchema.deleteProduct, "params"),
  productController.delete,
);

export default router;
