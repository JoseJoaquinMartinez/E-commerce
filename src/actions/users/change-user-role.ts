"user server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }
  try {
    const newRole = role === "admin" ? "admin" : "user";

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/Admin/users");
    return { ok: true };
  } catch (error) {
    console.error("Error changing user role:", error);
    return {
      ok: false,
      message: "Fallo al cambiar el rol del usuario",
    };
  }
};
