"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    //if everything goes ok it will automatically sing in and refresh the browser

    await signIn("credentials", {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "CredentialsSignin";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      ok: false,
      message: "Error during login",
    };
  }
};
