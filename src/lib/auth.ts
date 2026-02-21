import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const user = await db.user.findUnique({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid credentials");
          }

          // update activity timestamp
          await db.user.update({
            where: { id: user.id },
            data: { updatedAt: new Date() },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async session({ session, token }) {
      if (!session?.user || !token?.sub) return session;

      // always fetch fresh DB user
      const freshUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (freshUser) {
        session.user.id = freshUser.id;
        session.user.email = freshUser.email;
        session.user.name = freshUser.name;
        session.user.image = freshUser.image;
        session.user.role = freshUser.role;
        session.user.createdAt = freshUser.createdAt;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
