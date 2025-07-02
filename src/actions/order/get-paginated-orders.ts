"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { ok: false, message: "Unauthorized" };
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    return {
      ok: false,
      message: "Fallo al obtener los pedidos",
    };
  }
};
