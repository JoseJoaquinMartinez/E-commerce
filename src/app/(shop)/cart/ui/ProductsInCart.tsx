"use client";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
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
          <Image
            src={`/products/${product.image}`}
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
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              <p>{product.title}</p>
            </Link>
            <p>{product.price}€</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity: number) => {
                updateProductQuantity(product, quantity);
              }}
            />
          </div>
          <button
            className="underline mt-3"
            onClick={() => removeProductFromCart(product)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </>
  );
};
