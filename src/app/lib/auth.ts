import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "@/app/lib/prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await prismaClient.user.findFirst({
          where: {
            email: credentials?.email,
            AND: {
              password: credentials?.password,
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
            transactions: true,
          },
        });

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = { user: token.user } as any;
      return session;
    },
  },
};
