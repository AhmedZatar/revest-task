import {Router} from "express";
import {schemaValidator} from "../middlewares";
import {productSchema} from "./schemas";

const router = Router();

router.get(
  "/:id",
  schemaValidator(productSchema.getProductById, "params"),
  (req, res) => {
    res.send("Product by ID");
  },
);
router.get(
  "/",
  schemaValidator(productSchema.getProductsList, "query"),
  (req, res) => {
    res.send("List of products");
  },
);
router.post(
  "/",
  schemaValidator(productSchema.createProduct, "body"),
  (req, res) => {
    res.send("Create product");
  },
);
router.put(
  "/:id",
  schemaValidator(productSchema.updateProduct.params, "params"),
  schemaValidator(productSchema.updateProduct.body, "body"),
  (req, res) => {
    res.send("Update product");
  },
);
router.delete(
  "/:id",
  schemaValidator(productSchema.deleteProduct, "params"),
  (req, res) => {
    res.send("Delete product");
  },
);

export default router;
