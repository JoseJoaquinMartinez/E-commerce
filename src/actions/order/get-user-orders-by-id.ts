"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getUserOrdersById = async (userId: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "No hay sesión activa",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
          },
        },
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!orders || orders.length === 0) return { ok: true, orders: [] };

    if (session.user.role === "user") {
      if (session.user.id !== orders[0].user.id) {
        throw `${orders[0].user.id} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      orders: orders,
    };
  } catch (error) {
    console.error("Error al obtener los pedidos del usuario:", error);
    return {
      ok: false,
      message: "Error al obtener los pedidos del usuario",
    };
  }
};
