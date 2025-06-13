"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [posted, setPosted] = useState<boolean>(false);
  const [size, setSize] = useState<Size | undefined>();

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    setPosted(true);
    if (!size) {
      return;
    }

    //todo: add product to cart
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
