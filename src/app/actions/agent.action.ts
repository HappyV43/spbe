"use server";
import prisma from "@/lib/db";
import { Agents } from "@/lib/types";

export const getAgentsAll = async () => {
  try {
    return await prisma.agents.findMany();
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
