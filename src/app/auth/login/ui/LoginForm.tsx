"use client";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state === "success") {
      // Redirect to the home page after successful login
      router.replace("/");
    } else if (state === "CredentialsSignin") {
      // Handle invalid credentials
      console.error("Invalid credentials");
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {state === "CredentialsSignin" && (
        <div className=" flex flex-row mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500 mb-2" />
          <p className="text-sm text-red-500">Credenciales no válidos</p>
        </div>
      )}
      <LoginButton />

      {/* info text */}

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      type="submit"
      disabled={pending}
    >
      Iniciar Sesion
    </button>
  );
}
