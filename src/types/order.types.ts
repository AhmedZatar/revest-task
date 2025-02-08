import {Order, Product} from "@prisma/client";

export interface OrderProduct {
  product: Pick<Product, "name" | "price" | "description" | "category">;
  quantity: number;
  totalPrice: number;
}

export interface OrderWithProducts extends Order {
  products: OrderProduct[];
  totalAmount: number;
}
