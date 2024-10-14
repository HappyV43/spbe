"use server";
import prisma from "@/lib/db";
import { Companies } from "@/lib/types";

export const getCompaniesAll = async () => {
  try {
    return await prisma.companies.findMany();
  } catch (error) {
    throw error;
  }
};

export const postCompaniesData = async (values: Companies) => {
  try {
    const existingCompanies = await prisma.companies.findMany();
    return await prisma.companies.create({
      data: {
        companyName: values.companyName,
        address: values.address,
        telephone: values.telephone,
        createdBy: values.createdBy,
        updatedBy: values.updatedBy,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("upload Company failed");
  }
};
