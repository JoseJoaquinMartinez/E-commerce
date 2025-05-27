import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title
        title="Welcome to Our Shop"
        subtitle="Explore our latest products and offers"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
