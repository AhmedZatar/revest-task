import {Request, Response, NextFunction} from "express";
import {ProductCategory} from "@prisma/client";

import {productService} from "../services";
import {responseHandler} from "../utils";

export default {
  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      const product = await productService.getById(Number(id));

      if (!product) {
        responseHandler.notFound(res, "Product not found");
        return;
      }

      responseHandler.success(res, product);
    } catch (error) {
      next(error);
    }
  },

  async getList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        category = undefined,
      } = req.query;

      const products = await productService.getList(
        Number(page),
        Number(limit),
        search as string,
        (category as ProductCategory) || undefined,
      );

      responseHandler.success(res, products);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await productService.create(req.body);
      responseHandler.success(res, product, "Product created", 201);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;

      const updatedProduct = await productService.update(Number(id), req.body);
      responseHandler.success(res, updatedProduct, "Product updated");
    } catch (error: any) {
      if (error.message.includes("Product not found")) {
        responseHandler.notFound(res, error.message);
        return;
      }
      next(error);
    }
  },
  
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;

      await productService.delete(Number(id));
      responseHandler.success(res, null, "Product deleted");
    } catch (error: any) {
      if (error.message.includes("Product not found")) {
        responseHandler.notFound(res, error.message);
        return;
      }
      next(error);
    }
  },
};
