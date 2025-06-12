"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  return (
    <>
      {/* Size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Quantity selector */}
      <QuantitySelector quantity={2} />

      {/* Buy button */}
      <button className="btn-primary my-5">Añadir al carrito</button>
    </>
  );
};
