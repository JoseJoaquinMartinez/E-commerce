export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: currentPage,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title="Welcome to Our Shop"
        subtitle="Explore our latest products and offers"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
