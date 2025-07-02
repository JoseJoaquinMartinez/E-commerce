"use server";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: { inStock: true },
    });

    return stock?.inStock ?? 0; // Return 0 if stock is undefined
  } catch (error) {
    console.error("Error fetching stock by slug:", error);
    return 0;
  }
};
