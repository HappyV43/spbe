import prisma from "@/lib/db";

export const getCompaniesAll = async () => {
  try {
    return await prisma.companies.findMany();
  } catch (error) {
    console.error("error", error);
  }
};
