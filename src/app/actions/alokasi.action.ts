"use server";

import prisma from "@/lib/db";
import { Allocation, AllocationData, DataConfig, MonthlyAllocation, SummaryProps } from "@/lib/types";
import type { MonthlyAllocations } from "@prisma/client";

export async function getAllokasiAll(): Promise<Allocation[]> {
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
}

export async function getMonthlyAllocation(): Promise<MonthlyAllocation[]> {
  const data = await prisma.monthlyAllocations.findMany();
  return data as MonthlyAllocations[];
}

export const getSummary = async (): Promise<SummaryProps> => {
  const allocationData = await prisma.allocations.findMany({
    select: {
      allocatedQty: true,
      plannedGiDate: true,
      lpgDistribution: {
        select: {
          distributionQty: true,
          giDate: true,
        },
      },
    },
  });
  const monthlyAllocations = await prisma.monthlyAllocations.findMany({
    select: {
      date: true,
      totalElpiji: true,
    },
  });

  // Map the results to match the SummaryProps structure
  const data: AllocationData[] = allocationData.map((allocation) => ({
    plannedGiDate: allocation.plannedGiDate,
    allocatedQty: allocation.allocatedQty,
    lpgDistribution: allocation.lpgDistribution
      ? {
          giDate: allocation.lpgDistribution.giDate,
          distributionQty: allocation.lpgDistribution.distributionQty,
        }
      : null,
  }));

  const monthly: DataConfig[] = monthlyAllocations.map((monthlyAllocation) => ({
    date: monthlyAllocation.date,
    qty: monthlyAllocation.totalElpiji,
  }));

  // Return the structured result
  return { data, monthly };
};
