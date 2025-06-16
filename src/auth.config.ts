import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    providers: [
        Credentials({

            async authorize(credentials, req) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                console.log({
                    email,
                    password,
                })

                // Search the email in the database
                // If user is found and password matches, return a user object:
                // return { id: "user-id", name: "User Name", email: email };
                // Otherwise, return null

                return null;
            },
        }),
    ],
};

export const { signIn, signOut, auth: middleware } = NextAuth(authConfig);