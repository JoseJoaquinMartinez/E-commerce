"use server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");
export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se puede eliminar una imagen que no es de Cloudinary",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deleteImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    // Revalidate the product page to reflect the changes
    revalidatePath(`/admind/products`);
    revalidatePath(`/admind/product/${deleteImage.product.slug}`);
    revalidatePath(`/products/${deleteImage.product.slug}`);
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return {
      ok: false,
      message: "Error al eliminar la imagen",
    };
  }
};
