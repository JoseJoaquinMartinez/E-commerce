"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "No hay sesión activa",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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
    console.error("Error al obtener los pedidos del usuario:", error);
    return {
      ok: false,
      message: "Fallo al obtener los pedidos del usuario",
    };
  }
};
