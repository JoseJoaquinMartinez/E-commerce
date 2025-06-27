"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productId: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return {
        ok: false,
        message: "No hay sesión activa  ",
      };
    }
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      ok: false,
      message: "Error placing order",
    };
  }
};
