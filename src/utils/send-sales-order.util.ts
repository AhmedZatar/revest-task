import axios from "axios";

import config from "../config";

import {OrderWithProducts} from "../types";

export default async (order: OrderWithProducts | null): Promise<void> => {
  if (!order) {
    console.error("❌ No order to push");
    return;
  }
  try {
    const response = await axios.post(
      `${config.THIRD_PARTY_API_URL}/salesOrder`,
      order,
      {
        headers: {
          Authorization: `Bearer ${config.THIRD_PARTY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      console.error(
        `❌ Failed to push sales order(${order.id}) :`,
        response.statusText,
      );
      return;
    }

    console.log(`✅ Sales order with id: ${order.id} pushed successfully:`);
  } catch (error) {
    console.error(`❌ Failed to push sales order(${order.id}) :`, error);
  }
};
