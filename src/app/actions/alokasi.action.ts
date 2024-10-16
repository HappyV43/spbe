"use server";

import prisma from "@/lib/db";
import { Allocation } from "@/lib/types";

export async function getAllokasiAll() {
  try {
    const data = await prisma.allocations.findMany({
      where: {
        status: {
          in: ["Pending", "Approved"],
        },
      },
    });
    return data as Allocation[];
  } catch (error) {
    throw error;
  }
}
