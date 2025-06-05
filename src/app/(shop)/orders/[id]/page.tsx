import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params }: Props) {
  const { id } = params;

  //todo: verificar
  //redirect
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Pedido #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": true,
                  "bg-green-700": false, // Change to true if the order is paid
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
              <span className="mx-2">Pedido pagado</span>
            </div>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>{product.price}€ x 3</p>
                  <p className="font-bold">Subtotal: {product.price} x 3</p>
                </div>
                <button className="underline mt-3">Eliminar</button>
              </div>
            ))}
          </div>
          {/* Checkout - Resumen de compra*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl font-bold">Nombre</p>
              <p>Calle</p>
              <p>Ciudad</p>
              <p>Pais</p>
              <p>Codigo postal</p>
              <p>Teléfono</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
            <h2 className="text-2xl mb-2">Resumen de compra</h2>
            <div className="grid grid-cols-2">
              <span>Nº productos</span>
              <span className="text-right">3 artículos</span>

              <span>SubTotal</span>
              <span className="text-right">100€</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">100€</span>

              <span className="mt-5 text-2xl ">Total</span>
              <span className="text-right mt-5 text-2xl">100€</span>
            </div>

            <div className=" mb-2 w-full mt-5">
              <Link
                href={"/orders/123"}
                className="flex btn-primary justify-center"
              >
                Pagar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
