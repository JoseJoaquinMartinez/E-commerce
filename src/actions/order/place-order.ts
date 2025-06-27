"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productIds: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
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

    //Get products info -- Note: we can have multiple products with the same id
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds.map((item) => item.productIds) },
      },
    });

    //Calculate totals

    const itemsInOrder = productIds.reduce(
      (count, item) => count * item.quantity,
      0
    );

    // Calculate subtotal, tax, and total
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      ok: false,
      message: "Error placing order",
    };
  }
};
