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

    if (existingRecord) {
      // Jika ada record dengan deliveryNumber yang sama, lakukan update (override)
      const updatedRecord = await prisma.allocations.update({
        where: {
          id: existingRecord.id,
        },
        data: {
          giDate: data.giDate ? new Date(data.giDate) : null,
          shipTo: data.shipTo,
          materialName: data.materialName,
          agentName: data.agentName,
          plannedGiDate: data.plannedGiDate,
          allocatedQty: data.allocatedQty,
          updatedBy: data.updatedBy,
        },
      });
      return updatedRecord;
      console.log("Data updated:");
    } else {
      // Jika tidak ada, lakukan create
      const newRecord = await prisma.allocations.create({
        data: {
          giDate: data.giDate ? new Date(data.giDate) : null,
          deliveryNumber: data.deliveryNumber,
          shipTo: data.shipTo,
          materialName: data.materialName,
          agentName: data.agentName,
          plannedGiDate: data.plannedGiDate,
          allocatedQty: data.allocatedQty,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        },
      });
      console.log("New data created:");
      revalidatePath("/dashboard/alokasi");
      return newRecord;
    }
  } catch (error) {
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
