import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
    emailVerified?: Date | null;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: UserRole;
  }
}