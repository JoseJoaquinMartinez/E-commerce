"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!address) {
      console.warn(`No address found for user ID: ${userId}`);
      return null;
    }

    const { countryId, address2, city, ...restAddress } = address;
    return {
      ...restAddress,
      country: countryId,
      address2: address2 || "",
      city: city || "",
    };
  } catch (error) {
    console.error("Error fetching user address:", error);
    return null;
  }
};
