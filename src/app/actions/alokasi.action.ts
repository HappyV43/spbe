"use server";

import prisma from "@/lib/db";
import { Allocation } from "@/lib/types";
import type { MonthlyAllocations } from "@prisma/client";

export async function getAllokasiAll() {
  try {
    const data = await prisma.allocations.findMany({
      where: {
        AND: {
          status: {
            in: ["Pending", "Approved"],
          },
        },
      },
    });
    return data as Allocation[];
  } catch (error) {
    throw error;
  }
}

export async function getMonthlyAllocation() {
  try {
    const data = await prisma.monthlyAllocations.findMany();
    return data as MonthlyAllocations[];
  } catch (error) {
    throw error;
  }
}
