"use server";

import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { SignInValues } from "@/lib/types";
import { Argon2id } from "oslo/password";

export const signIn = async (values: SignInValues) => {
  const user = await prisma.user.findUnique({
    where: {
      username: values.username,
    },
  });

  if (!user || !user.password) {
    return { success: false, error: "Invalid Credentials!" };
  }

  const passwordMatch = await new Argon2id().verify(
    user.password,
    values.password
  );

  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials!" };
  }

  // successfully login
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { success: true };
};

export const logOut = async () => {
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth/login");
};

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) {
    return null;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      // refreshing their session cookie
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("error disini", error);
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      username: true,
    },
  });
  return dbUser;
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
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
