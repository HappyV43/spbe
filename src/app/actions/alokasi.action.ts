"use server";

import prisma from "@/lib/db";
import { Allocation } from "@/lib/types";

export async function getAllokasiAll(): Promise<Allocation[]> {
  const data = await prisma.allocations.findMany();
  return data;
}
