"use client";
import { notFound } from "next/navigation";

import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "para Hombres",
    women: "para Mujeres",
    kid: "para Niños",
    unisex: "para todos",
  };

  /*  if (id === "kid") {
    notFound();
  } */

  return (
    <>
      <Title title={`Artículos de ${labels[id]}`} className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
