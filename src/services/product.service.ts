import {ProductCategory} from "@prisma/client";

import {prisma} from "../utils";

interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
}

interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
}

export default {
  async getById(id: number) {
    return prisma.product.findUnique({where: {id, deletedAt: null}});
  },

  async getList(
    page: number = 1,
    limit: number = 10,
    search: string = "",
    category: ProductCategory | undefined,
  ) {
    const skip = (page - 1) * limit;

    return prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        category: category,
        deletedAt: null,
      },
      skip,
      take: limit,
      orderBy: {createdAt: "desc"},
    });
  },

  async create(data: CreateProductDTO) {
    return prisma.product.create({data});
  },

  async update(id: number, data: UpdateProductDTO) {
    const product = await this.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return prisma.product.update({
      where: {id},
      data,
    });
  },

  async delete(id: number) {
    const product = await this.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return prisma.product.update({
      where: {id},
      data: {deletedAt: new Date()},
    });
  },

  async getExistingProductIds(productIds: number[]) {
    const existingProducts = await prisma.product.findMany({
      where: {id: {in: productIds}, deletedAt: null},
      select: {id: true},
    });

    return existingProducts.map((p) => p.id);
  },
};
