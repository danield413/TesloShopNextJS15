import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },

    callbacks: {
      jwt({ token, user }) {

        // console.log("JWT callback", { token, user });
        // Si no hay usuario, regresamos el token tal cual
        if (!user) return token;

        // Si hay un usuario, guardamos sus datos en el token
        // Esto se ejecuta cuando el usuario inicia sesión por primera vez

       if (user) {
          // Si hay un usuario, guardamos sus datos en el token
          token.data = user;
        }
        return token;
      },

      session({ session, token, user }) {
        // console.log("Session callback", { session, token, user });
        session.user = token.data as any;
        return session
      },
    },

    providers: [

    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);


          if ( !parsedCredentials.success ) return null;

          const { email, password } = parsedCredentials.data;


          // Buscar el correo
          const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
          if ( !user ) return null;

          // Comparar las contraseñas
          if( !bcryptjs.compareSync( password, user.password ) ) return null;


          // Regresar el usuario sin el password
          const { password: _, ...rest } = user;

          return rest;
      },
    }),


  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);