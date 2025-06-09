import { User } from "@prisma/client";
import { Request } from "express";

type UserWithoutPassword = Omit<User, "password" | "createdAt" | "updatedAt">;

export type ExtendedRequest = Request & { user?: UserWithoutPassword };
