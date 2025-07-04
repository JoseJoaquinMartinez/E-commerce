"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se pudo encontrar la orden con ID: ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error setting transaction ID:", error);
    return {
      ok: false,
      message: "Failed to set transaction ID",
    };
  }
};
