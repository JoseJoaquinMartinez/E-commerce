"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
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
        id: { in: productIds.map((item) => item.productId) },
      },
    });

    //Calculate totals

    const itemsInOrder = productIds.reduce(
      (count, item) => count * item.quantity,
      0
    );

    // Calculate subtotal, tax, and total
    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );
        if (!product) throw new Error(`${item.productId} no encontrado - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.21; // Assuming a 21% tax rate
        totals.total += subTotal + totals.tax;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        //Update stock for each product
        const updatedProductsPromises = products.map((product) => {
          //sum the quantity of the product in the order
          const productQuantity = productIds
            .filter((p) => p.productId === product.id)
            .reduce((acc, item) => acc + item.quantity, 0);
          if (productQuantity === 0) {
            throw new Error(
              `El producto ${product.id} no tiene cantidad definida`
            );
          }

          return tx.product.update({
            where: { id: product.id },
            data: {
              /*  inStock: product.inStock - productQuantity, */
              inStock: { decrement: productQuantity },
            },
          });
        });

        const updatedProducts = await Promise.all(updatedProductsPromises);

        // Check if any product has insufficient stock
        updatedProducts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(
              `El producto ${product.title} no tiene suficiente stock`
            );
          }
        });

        //Create order headed -- detail
        const order = await tx.order.create({
          data: {
            userId,
            itemsInOrder,
            subTotal,
            tax,
            total,

            OrderItem: {
              createMany: {
                data: productIds.map((product) => ({
                  quantity: product.quantity,
                  size: product.size,
                  productId: product.productId,
                  price:
                    products.find((p) => p.id === product.productId)?.price ??
                    0,
                })),
              },
            },
          },
        });

        //validate if price = 0 -- throw error;

        // Create order Address
        const { country, ...restAddress } = address;

        const orderAddress = await tx.orderAddress.create({
          data: {
            ...restAddress,
            countryId: country,
            orderId: order.id,
          },
        });

        return {
          order,
          orderAddress,
          updatedProducts,
        };
      });

      return {
        ok: true,
        order: prismaTx.order,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          ok: false,
          message: error.message,
        };
      }
    }

    //Create transaction
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      ok: false,
      message: "Error placing order",
    };
  }
};
