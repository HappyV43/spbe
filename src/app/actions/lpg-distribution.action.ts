"use server";

import prisma from "@/lib/db";
import { LpgDistributions } from "@/lib/types";
import { getUser } from "./auth.actions";
import { revalidatePath } from "next/cache";

export const searchDeliveryNumber = async (query: string) => {
  try {
    if (!query) return [];

    console.log("Searching for query:", query);

    const searchResult = await prisma.allocations.findMany({
      where: {
        AND: [
          {
            status: {
              in: ["Pending"],
            },
          },
          {
            deliveryNumber: {
              equals: query,
            },
          },
        ],
      },

      select: {
        id: true,
        shipTo: true,
        deliveryNumber: true,
        agentName: true,
        allocatedQty: true,
      },
    });

    console.log("Search result:", JSON.stringify(searchResult, null, 2));

    return searchResult;
  } catch (error) {
    console.error("Error saat mencari delivery number:", error);
    throw error;
  }
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "something went wrong";
  }
  return message;
};

export const postLpgData = async (formData: FormData) => {
  const allocationid = Number(formData.get("allocationid"));
  const nomorTransaksi = formData.get("nomorTransaksi")?.toString() || "";
  const nomorDo = formData.get("nomorDo")?.toString() || "";
  const namaAgen = formData.get("namaAgen")?.toString() || "";
  const waktuPengambilan = formData.get("waktuPengambilan")
    ? new Date(formData.get("waktuPengambilan")!.toString())
    : new Date();
  const platKendaraan = formData.get("platKendaraan")?.toString() || "";
  const namaSopir = formData.get("namaSopir")?.toString() || "";
  const status = formData.get("status")?.toString() || "Pending";
  const jumlahTabung = Number(formData.get("jumlahTabung")) || 0;
  const volumeTabung = Number(formData.get("volumeTabung")) || 0;
  const jumlahTabungBocor = formData.get("jumlahTabungBocor")
    ? Number(formData.get("jumlahTabungBocor"))
    : null;

  const isiKurang = formData.get("isiKurang")
    ? Number(formData.get("isiKurang"))
    : null;
  const shipTo = formData.get("shipTo")?.toString() || "";

  if (
    !nomorTransaksi ||
    !nomorDo ||
    !namaAgen ||
    !waktuPengambilan ||
    !platKendaraan ||
    !namaSopir ||
    !status
  )
    return {
      error: "Semua field harus diisi",
    };

  try {
    const user = await getUser();
    if (!user)
      return {
        error: "User tidak ada atau user belum login",
      };
    const dataLpg: LpgDistributions = await prisma.lpgDistributions.create({
      data: {
        allocationId: allocationid,
        deliveryNumber: nomorDo,
        bpeNumber: nomorTransaksi,
        agentName: namaAgen,
        giDate: waktuPengambilan,
        licensePlate: platKendaraan,
        driverName: namaSopir,
        status: status,
        allocatedQty: jumlahTabung,
        volume: volumeTabung,
        distributionQty: jumlahTabung,
        shipTo: shipTo,
        isiKurang: isiKurang || null,
        bocor: jumlahTabungBocor || null,
        createdBy: user.id,
        updatedBy: user.id,
      },
    });

    await prisma.allocations.update({
      where: { id: allocationid },
      data: {
        status: status,
        giDate: waktuPengambilan,
        bpeNumber: nomorTransaksi,
        updatedBy: user.id,
      },
    });
    revalidatePath("/dashboard/penyaluran-elpiji");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const getAllLpg = async () => {
  try {
    const data = await prisma.lpgDistributions.findMany({
      where: {
        status: {
          in: ["Pending", "Approved"],
        },
      },
    });
    return data as LpgDistributions[];
  } catch (error) {
    throw error;
  }
};
