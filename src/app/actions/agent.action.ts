"use server";
import prisma from "@/lib/db";
import { Agents } from "@/lib/types";
import { getErrorMessage } from "./error.action";
import { revalidatePath } from "next/cache";
import { getCompaniesAll } from "./companies.action";
import { assertAuthenticated } from "@/lib/lucia";
import { redirect } from "next/navigation";

export const getAgentsAll = async () => {
  const companiesData = await getCompaniesAll();
  if (!companiesData) {
    redirect("/master-data/companies/form");
  }
  try {
    return await prisma.agents.findMany();
  } catch (error) {
    throw error;
  }
};

export const postAgentData = async (formData: FormData) => {
  const agentName = formData.get("agentName")?.toString();
  const shipTo = formData.get("shipTo")?.toString() || null;
  const companyId = Number(formData.get("companyId"));
  const address = formData.get("address")?.toString();
  const city = formData.get("city")?.toString();
  const phone = formData.get("phone")?.toString();
  const fax = formData.get("fax")?.toString() || null;
  const companyName = formData.get("companyName")?.toString();
  if (!agentName || !address || !city || !phone || !companyName) {
    return {
      error: "Semua field harus di isi",
    };
  }
  const user = await assertAuthenticated();
  if (!user) {
    return {
      error: "User tidak ditemukan. Silakan login kembali.",
    };
  }
  try {
    const postData: Agents = await prisma.agents.create({
      data: {
        agentName: agentName,
        shipTo: shipTo || null,
        companyId: companyId,
        address: address,
        city: city,
        phone: phone,
        fax: fax || null,
        companyName: companyName,
        updatedBy: user.id,
        createdBy: user.id,
      },
    });
    revalidatePath("/data-master/agents");
    return { success: true, data: postData };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Database Error: ", errorMessage);
    return {
      error: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
    };
  }
};
export const updateAgentData = async (formData: FormData) => {
  const agentName = formData.get("agentName")?.toString();
  const shipTo = formData.get("shipTo")?.toString()
    ? formData.get("shipTo")?.toString()
    : null;
  const companyId = Number(formData.get("companyId"));
  const address = formData.get("address")?.toString();
  const city = formData.get("city")?.toString();
  const phone = formData.get("phone")?.toString();
  const fax = formData.get("fax")?.toString()
    ? formData.get("shipTo")?.toString()
    : null;
  const companyName = formData.get("companyName")?.toString();
  if (!companyId) {
    return {
      error: "ID is missing.",
    };
  }

  try {
    const updatedData = await prisma.agents.update({
      where: {
        id: companyId,
      },
      data: {
        companyId: companyId,
        agentName: agentName,
        shipTo: shipTo,
        address: address,
        city: city,
        fax: fax,
        phone: phone,
        companyName: companyName,
      },
    });
    revalidatePath("/data-master/agents");
    return { success: true, data: updatedData };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
export const deleteAgentData = async (id: number) => {
  try {
    await prisma.agents.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
