"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleted = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    if (!deleted) {
      return {
        ok: false,
        message: "No se encontró la dirección del usuario",
      };
    }
    return {
      ok: true,
      message: "Dirección del usuario eliminada correctamente",
    };
  } catch (error) {
    console.error("Error deleting user address:", error);
    return {
      ok: false,
      message: "Fallo al eliminar la dirección del usuario",
    };
  }
};
