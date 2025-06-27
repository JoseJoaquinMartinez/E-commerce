"use client";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const address = useAddressStore((state) => state.address);

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

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl font-bold">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
      <h2 className="text-2xl mb-2">Resumen de compra</h2>
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
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className=" mb-2 w-full mt-5">
        <p className="mb-5">
          {" "}
          {/* Disclaimer */}
          <span className="text-sx">
            * Al hacer clic en "Pagar", aceptas{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
            .
          </span>
        </p>
        <button
          /* href={"/orders/123"} */
          className="flex btn-primary justify-center"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};
