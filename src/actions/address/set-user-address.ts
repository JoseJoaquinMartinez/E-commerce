"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error("Error setting user address:", error);
    return {
      ok: false,
      error: "Fallo al guardar la dirección del usuario",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findFirst({
      where: {
        userId,
      },
    });

    const addressToSAve = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
    };
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSAve,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId: userId },
      data: addressToSAve,
    });

    return updatedAddress;
  } catch (error) {
    console.error("Error setting user address:", error);
    throw new Error("Fallo al guardar la dirección del usuario");
  }
};
