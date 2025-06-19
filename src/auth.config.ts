import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;

      return session;
    },
    /* authorized({auth, request: {nextUrl}}){
      
    } */
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        // If the credentials are invalid, return null
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Look for the email
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;
        //Compare passwords
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // If the credentials are valid, return a user object
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
