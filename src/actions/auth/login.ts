"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";

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
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
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
