"use server";

import prisma from "@/lib/db";
import { Agents, Allocation, MonthlyAllocation, RawData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const uploadExcel = async (
  data: Omit<Allocation, "createdAt" | "updatedAt">
) => {
  try {
    const existingRecord = await prisma.allocations.findFirst({
      where: {
        deliveryNumber: data.deliveryNumber,
      },
    });

    const findAgentName = await prisma.agents.findMany({
      where: {
        agentName: data.agentName,
      },
      select: {
        id: true,
      },
    });
    const agentId = findAgentName.length > 0 ? findAgentName[0].id : null;

    const allocationData = {
      shipTo: data.shipTo,
      materialName: data.materialName,
      agentId: agentId,
      agentName: data.agentName,
      plannedGiDate: data.plannedGiDate,
      allocatedQty: data.allocatedQty,
      updatedBy: data.updatedBy,
    };

    let result;
    if (existingRecord) {
      // Update existing record
      result = await prisma.allocations.update({
        where: { id: existingRecord.id },
        data: allocationData,
      });
    } else {
      // Create new record
      result = await prisma.allocations.create({
        data: {
          ...allocationData,
          giDate: data.giDate ? new Date(data.giDate) : null,
          deliveryNumber: data.deliveryNumber,
          createdBy: data.createdBy,
        },
      });
    }

    revalidatePath("/dashboard/alokasi");
    return result;
  } catch (error) {
    console.error("Failed to upload Excel data:", error);
    throw new Error("Failed to upload Excel data");
  }
};

export const uploadBulkExcel = async (datas: Allocation[]) => {
  try {
    for (const excel of datas) {
      await uploadExcel(excel);
    }
    revalidatePath("/dashboard/alokasi");
  } catch (error) {
    console.error(error);
    throw new Error("Bulk upload failed");
  }
};

export const uploadExcelMonthly = async (
  data: Omit<MonthlyAllocation, "createdAt" | "updatedAt">
) => {
  try {
    const excelMonthly = await prisma.monthlyAllocations.create({
      data: {
        date: data.Tanggal,
        totalElpiji: data.Total_Elpiji,
        volume: data.Volume_Total_Elpiji,
        updatedBy: data.updatedBy,
        createdBy: data.createdBy,
      },
    });
    return { success: true, data: excelMonthly };
  } catch (error) {
    console.error(error);
    throw new Error("Bulk upload failed");
  }
};

export const uploadBulkExcelMonthly = async (datas: MonthlyAllocation[]) => {
  try {
    for (const excel of datas) {
      await uploadExcelMonthly(excel);
    }
    revalidatePath("/dashboard/alokasi-bulanan");
  } catch (error) {
    return {
      error: "Terjadi masalah saat import excel",
    };
  }
};
