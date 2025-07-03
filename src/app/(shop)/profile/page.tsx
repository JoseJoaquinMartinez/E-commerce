import { getUserOrdersById } from "@/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoCardOutline } from "react-icons/io5";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { ok, orders } = await getUserOrdersById(session.user.id);

  if (!ok || !orders) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">
          Hubo un error cargando los pedidos
        </h1>
        <p className="mt-4">Vuelve a intentarlo más tarde.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">No tienes pedidos</h1>
        <p className="mt-4">Realiza tu primer pedido para verlo aquí.</p>
      </div>
    );
  }
  return (
    <>
      <Title title="Todos los pedidos" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver pedido
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
