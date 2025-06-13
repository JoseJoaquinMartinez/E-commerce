"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [posted, setPosted] = useState<boolean>(false);
  const [size, setSize] = useState<Size | undefined>();

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    setPosted(true);
    if (!size) {
      return;
    }

    //add product to cart
    const cartProduct: CartProduct = {
      id: product.id,
      size: size,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    //reset state
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };
  return (
    <>
      {posted && !size && (
        <span className="text-red-500 text-sm mt-2 fade-in">
          Debe seleccionar una talla para añadir el producto al carrito*
        </span>
      )}
      {/* Size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Buy button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Añadir al carrito
      </button>
    </>
  );
};
