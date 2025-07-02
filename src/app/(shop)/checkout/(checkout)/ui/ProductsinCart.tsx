"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="text-center">Cargando...</p>;
  }
  return (
    <>
      {/* Items */}
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <div>
            <span>
              <p>
                {product.size} - {product.title} ({product.quantity})
              </p>
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}€
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
