import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    const body = await req.json();

    const { from, to } = body;

    const fromDate = new Date(from);
    let toDate = to ? new Date(to) : new Date(from);

    // Pastikan toDate mencakup akhir hari (optional)
    toDate.setHours(23, 59, 59, 999);

    const [dailySummary, distributionSummary, monthlyData, uniqueDate] =
      await prisma.$transaction([
        prisma.allocations.aggregate({
          _sum: { allocatedQty: true },
          _count: { allocatedQty: true },
          where: {
            giDate: { gte: fromDate, lte: toDate },
          },
          orderBy: { plannedGiDate: "asc" },
        }),
        prisma.lpgDistributions.aggregate({
          _sum: { distributionQty: true },
          _count: { distributionQty: true },
          where: {
            giDate: { gte: fromDate, lte: toDate },
          },
          orderBy: { giDate: "asc" },
        }),
        prisma.monthlyAllocations.aggregate({
          _sum: { totalElpiji: true },
          _count: { totalElpiji: true },
          where: {
            date: { gte: fromDate, lt: toDate },
          },
          orderBy: { date: "asc" },
        }),
        prisma.lpgDistributions.findMany({
          distinct: ["giDate"], // Ambil tanggal unik
          select: {
            giDate: true, // Cuma ambil tanggalnya aja
          },
          where: {
            giDate: { gte: fromDate, lt: toDate },
          },
          orderBy: {
            giDate: "asc", // Urutkan dari yang paling awal
          },
        }),
      ]);

    const totalProps = uniqueDate.reduce(
      (a, obj) => a + Object.keys(obj).length,
      0
    );

    const dailyAllo = dailySummary._sum?.allocatedQty;
    const dailyDistri = distributionSummary._sum?.distributionQty;
    const dailyMonthly = monthlyData._sum?.totalElpiji;

    const pending =
      (dailyAllo ?? 0) > (dailyDistri ?? 0)
        ? (dailyAllo ?? 0) - (dailyDistri ?? 0)
        : 0;

    const fakultatif =
      (dailyAllo ?? 0) > (dailyMonthly ?? 0)
        ? (dailyAllo ?? 0) - (dailyMonthly ?? 0)
        : 0;

    const tidakTembus =
      (dailyMonthly ?? 0) > (dailyAllo ?? 0)
        ? (dailyMonthly ?? 0 ?? 0) - (dailyAllo ?? 0)
        : 0;

    const average = ((dailyAllo ?? 0) / (totalProps || 1)).toFixed(2);

    // Contoh response
    return NextResponse.json(
      {
        message: "Date range received",
        dailySummary,
        distributionSummary,
        monthlyData,
        pending,
        fakultatif,
        tidakTembus,
        average,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
