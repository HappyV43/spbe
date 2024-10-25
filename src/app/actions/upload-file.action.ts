"use server";

import prisma from "@/lib/db";
import { Agents, Allocation, RawData } from "@/lib/types";
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


    const allocationData = {
      shipTo: data.shipTo,
      materialName: data.materialName,
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
      console.log("Data updated:", result);
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
      console.log("New data created:", result);
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
