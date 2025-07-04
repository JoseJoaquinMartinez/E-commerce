import { Title } from "@/components";

import Link from "next/link";

import { ProductsInCart } from "./ui/ProductsinCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title="Confirmar compra" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Modificar compra</span>
            <Link href={"/cart"} className="underline mb-5">
              Modificar compra
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>
          {/* Checkout - Resumen de compra*/}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
