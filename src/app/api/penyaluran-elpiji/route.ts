import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentName, deliveryNumber, range, page = 1, pageSize = 15 } = body;

    const whereConditions: any = {};

    if (agentName) {
      whereConditions.agentName = {
        equals: agentName,
        mode: "insensitive",
      };
    }

    if (deliveryNumber) {
      whereConditions.deliveryNumber = {
        equals: deliveryNumber,
        mode: "insensitive",
      };
    }

    if (range?.from && range?.to) {
      const start = new Date(range.from);
      const end = new Date(range.to);

      // Validasi jika format tanggalnya benar
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json(
          { message: "Invalid date format" },
          { status: 400 }
        );
      }

      whereConditions.giDate = {
        gte: new Date(start.setHours(0, 0, 0, 0)), // Set waktu awal hari
        lte: new Date(end.setHours(23, 59, 59, 999)), // Set waktu akhir hari
      };
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Query total count untuk pagination
    const totalCount = await prisma.lpgDistributions.count({
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined, // Jika tidak ada filter, where akan diabaikan
    });

    const filteredData = await prisma.lpgDistributions.findMany({
      where:
        Object.keys(whereConditions).length > 0 ? whereConditions : undefined, // Jika tidak ada filter, where akan diabaikan
      skip,
      take,
      orderBy: { bpeNumber: "asc" },
      select: {
        id: true,
        bpeNumber: true,
        giDate: true,
        agentName: true,
        licensePlate: true,
        deliveryNumber: true,
        allocatedQty: true,
        distributionQty: true,
        volume: true,
        driverName: true,
        bocor: true,
        isiKurang: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: filteredData.length
        ? "Data fetched successfully"
        : "No data found",
      data: filteredData,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
