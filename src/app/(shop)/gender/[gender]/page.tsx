export const revalidate = 60;

import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

export default async function GenderPage({
  params,
  searchParams,
}: {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { gender } = await params;
  const { page } = await searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
    gender: gender as Gender,
  });

  if (!products || products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
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
      <Title title={`Artículos de ${labels[gender]}`} className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
