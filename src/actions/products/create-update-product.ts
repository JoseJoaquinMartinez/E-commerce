"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce
    .string()
    .transform((val) => val.split(",").map((size) => size.trim())),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedData = productSchema.safeParse(data);

  if (!parsedData.success) {
    console.log("Validation error:", parsedData.error);
    return { ok: false, message: "Datos no validos" };
  }

  const product = parsedData.data;

  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...restProduct } = product;
  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product;

    const tagsArray = restProduct.tags.split(",").map((tag) => tag.trim());
    if (id) {
      product = await tx.product.update({
        where: { id },
        data: {
          ...restProduct,
          sizes: {
            set: restProduct.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          ...restProduct,
          sizes: {
            set: restProduct.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    }
    return { ok: true, product };
  });

  //todo: revalidate path
};
