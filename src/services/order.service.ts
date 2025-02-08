import {OrderStatus} from "@prisma/client";

import {prisma} from "../utils";
import productService from "./product.service";

interface CreateOrderDTO {
  customerName: string;
  email: string;
  mobileNumber: string;
  address: string;
  products: {id: number; quantity: number}[];
}

interface UpdateOrderDTO {
  customerName?: string;
  email?: string;
  mobileNumber?: string;
  address?: string;
  status?: OrderStatus;
}

export default {
  productIncludes: {
    products: {
      include: {
        product: {
          select: {
            name: true,
            price: true,
            description: true,
            category: true,
          },
        },
      },
    },
  },

  async getById(id: string) {
    return prisma.order
      .findUnique({
        where: {id},
        include: this.productIncludes,
      })
      .then((order) => {
        if (!order) return null;
        return {
          ...order,
          totalAmount: order.products.reduce(
            (acc, p) => acc + p.product.price * p.quantity,
            0,
          ),
          products: order.products.map((p) => ({
            ...p.product,
            quantity: p.quantity,
            totalPrice: p.product.price * p.quantity,
          })),
        };
      });
  },

  async getList(
    page = 1,
    limit = 10,
    search = "",
    fromOrderDate?: string,
    toOrderDate?: string,
    status?: OrderStatus,
  ) {
    const skip = (page - 1) * limit;
    const filters: {
      OR?: {
        customerName?: {contains: string; mode: "insensitive"};
        address?: {contains: string; mode: "insensitive"};
        mobileNumber?: {contains: string; mode: "insensitive"};
        email?: {contains: string; mode: "insensitive"};
      }[];
      createdAt?: {gte?: Date; lte?: Date};
      status?: OrderStatus;
    } = {};

    if (search) {
      const searchKeys = ["customerName", "address", "mobileNumber", "email"];
      filters.OR = searchKeys.map((key) => ({
        [key]: {contains: search, mode: "insensitive"},
      }));
    }
    if (fromOrderDate || toOrderDate) {
      filters.createdAt = {};
      if (fromOrderDate) filters.createdAt.gte = new Date(fromOrderDate);
      if (toOrderDate) filters.createdAt.lte = new Date(toOrderDate);
    }
    if (status) filters.status = status;

    return prisma.order
      .findMany({
        where: filters,
        skip,
        take: limit,
        include: this.productIncludes,
        orderBy: {createdAt: "desc"},
      })
      .then((orders) =>
        orders.map((order) => ({
          ...order,
          totalAmount: order.products.reduce(
            (acc, p) => acc + p.product.price * p.quantity,
            0,
          ),
          products: order.products.map((p) => ({
            ...p.product,
            quantity: p.quantity,
            totalPrice: p.product.price * p.quantity,
          })),
        })),
      );
  },

  async create(data: CreateOrderDTO) {
    const productIds = data.products.map((p) => p.id);

    const existingProductIds = await productService.getExistingProductIds(
      productIds,
    );

    const missingProducts = productIds.filter(
      (id) => !existingProductIds.includes(id),
    );

    if (missingProducts.length > 0) {
      throw new Error(`Products not found: ${missingProducts.join(", ")}`);
    }

    const createdOrder = await prisma.order.create({
      data: {
        customerName: data.customerName,
        email: data.email.toLocaleLowerCase(),
        mobileNumber: data.mobileNumber,
        address: data.address,
        products: {
          create: data.products.map((p) => ({
            productId: p.id,
            quantity: p.quantity,
          })),
        },
      },
    });

    return this.getById(createdOrder.id);
  },

  async update(id: string, data: UpdateOrderDTO) {
    const existingOrder = await prisma.order.findUnique({where: {id}});

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    await prisma.order.update({
      where: {id},
      data,
    });

    return this.getById(id);
  },

  async delete(id: string) {
    const existingOrder = await prisma.order.findUnique({where: {id}});

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    await prisma.order.delete({where: {id}});

    return {message: "Order deleted successfully"};
  },
};
