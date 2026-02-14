// types/next-auth.d.ts
import NextAuth from "next-auth/next";

import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: UserRole;
  }
}