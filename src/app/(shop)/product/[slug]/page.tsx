export const revalidate = 604800; // 7 days

import { ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow } from "../../../../components/product/slideshow/ProductMobileSlideshow";
import { getProductBySlug } from "@/actions";

import type { Metadata } from "next";
import { AddToCart } from "./ui/AddToCart";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "Descripción no disponible",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "Descripción no disponible",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/*Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Product details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold- text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}€</p>
        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
