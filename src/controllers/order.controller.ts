import {Request, Response, NextFunction} from "express";
import {OrderStatus} from "@prisma/client";

import {orderService} from "../services";
import {responseHandler} from "../utils";

export default {
  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {id} = req.params;
      const order = await orderService.getById(id);

      if (!order) {
        responseHandler.notFound(res, "Order not found");
        return;
      }

      responseHandler.success(res, order);
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
        fromOrderDate,
        toOrderDate,
        status = undefined,
      } = req.query;
      const orders = await orderService.getList(
        Number(page),
        Number(limit),
        search as string,
        fromOrderDate as string,
        toOrderDate as string,
        (status as OrderStatus) || undefined,
      );

      responseHandler.success(res, orders);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const order = await orderService.create(req.body);
      responseHandler.success(res, order, "Order created", 201);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("Products not found")
      ) {
        responseHandler.badRequest(res, error.message);
        return;
      }
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;
      const updatedOrder = await orderService.update(id, req.body);
      responseHandler.success(res, updatedOrder, "Order updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("Order not found")) {
        responseHandler.notFound(res, error.message);
        return;
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {id} = req.params;
      await orderService.delete(id);
      responseHandler.success(res, null, "Order deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("Order not found")) {
        responseHandler.notFound(res, error.message);
        return;
      }
      next(error);
    }
  },
};
