"use server";

import prisma from "@/lib/db";
import { SignInValues } from "@/lib/types";
import { Argon2id } from "oslo/password";
import {
  deleteSessionTokenCookie,
  getSessionToken,
  setSession,
} from "@/lib/lucia";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  SessionValidationResult,
  createSession,
  generateSessionToken,
  invalidateSession,
  validateSessionToken,
} from "@/auth";
import { getErrorMessage } from "./error.action";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@prisma/client";

export const signIn = async (values: SignInValues) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: values.username },
    });

    if (!user || !user.password) {
      console.log(`Failed login attempt for username: ${values.username}`);
      return { success: false, error: "Invalid credentials" };
    }

    const passwordMatch = await new Argon2id().verify(
      user.password,
      values.password
    );

    if (!passwordMatch) {
      console.log(`Failed login attempt for username: ${values.username}`);
      return { success: false, error: "Invalid credentials" };
    }
    await setSession(user.id);
    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const logOut = async () => {
  // Retrieve the session token and compute session ID
  const sessionToken = getSessionToken();
  if (sessionToken) {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(sessionToken))
    );

    // Invalidate the session using session ID
    await invalidateSession(sessionId);
  }

  // Delete session token cookie
  deleteSessionTokenCookie();

  // Redirect to login page
  redirect("/auth/login");
};

export const registerAction = async (values: SignInValues) => {
  try {
    const existingUsers = await prisma.user.findMany();

    // Check if there are any existing users
    if (existingUsers.length === 0) {
      // If there are no existing users, assign the new user the "ADMIN" role
      const user = await prisma.user.create({
        data: {
          username: values.username,
          password: await new Argon2id().hash(values.password),
          role: "ADMIN",
        },
      });
      await setSession(user.id);
      return { success: true };
    } else {
      // If there are existing users, assign the new user the "USER" role
      const existingUser = await prisma.user.findUnique({
        where: {
          username: values.username,
        },
      });
      if (existingUser) {
        return { error: "User already exists", success: false };
      }

      const user = await prisma.user.create({
        data: {
          username: values.username,
          password: await new Argon2id().hash(values.password),
          role: "USER",
        },
      });
      await setSession(user.id);
      return { success: true };
    }
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
};

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("spbe-auth-cookies")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);

export const checkUserDb = cache(async () => {
  const checkUsername = await prisma.user.findMany();
  return checkUsername as User[];
});