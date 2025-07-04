"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();

  // Select each value individually for better reactivity and to avoid infinite loops
  const itemsInCart = useCartStore((state) => state.getTotalItems());
  const subTotal = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const tax = useCartStore(
    (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
      0.15
  );
  const total = useCartStore(
    (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
      1.15
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
