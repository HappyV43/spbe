"use server";

import { redirect } from "next/navigation";
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
import { invalidateSession } from "@/auth";
import { getErrorMessage } from "./error.action";
import { cookies } from "next/headers";

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

    cookies().set({
      name: "userRole",
      value: user.role,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure untuk production
      maxAge: 86400, // 1 hari
      path: "/",
      sameSite: "strict",
    });

    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const logOut = async () => {
  const sessionToken = getSessionToken();
  if (sessionToken) {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(sessionToken))
    );

    // Invalidate session in the database
    await invalidateSession(sessionId);
  }

  // Delete cookie on the client side
  deleteSessionTokenCookie();

  // Redirect to login page
  return redirect("/auth/login");
};

export const registerAction = async (values: SignInValues) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: values.username,
      },
    });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        username: values.username,
        password: hashedPassword,
        role: values.role,
        companiesId: parseInt(values.company.id),
      },
    });

    await setSession(user.id);
    return { success: true };
  } catch (error) {
    return { error: getErrorMessage(error), success: false };
  }
};
