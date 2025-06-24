import { Title } from "@/components";

import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { Country } from "@/interfaces";
import { auth } from "@/auth.config";

export default async function NamePage() {
  const countries: Country[] = await getCountries();
  const session = await auth();

  if (!session) {
    return (
      <h3 className="text-center text-2xl font-bold mt-10">
        No hay sesion activa. Por favor, inicia sesión para continuar.
      </h3>
    );
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}
