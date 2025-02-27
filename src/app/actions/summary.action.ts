"use server";

import prisma from "@/lib/db";
import { startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";

export const getSummaryToday = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [dailySummary, distributionSummary, monthlyData] =
    await prisma.$transaction([
      prisma.allocations.aggregate({
        _sum: { allocatedQty: true },
        _count: { _all: true },
        where: {
          giDate: { gte: today, lt: tomorrow },
        },
      }),
      prisma.lpgDistributions.aggregate({
        _sum: { distributionQty: true },
        _count: { _all: true },
        where: {
          giDate: { gte: today, lt: tomorrow },
        },
      }),
      prisma.monthlyAllocations.findMany({
        where: {
          date: { gte: today, lt: tomorrow },
        },
        select: { totalElpiji: true, volume: true },
      }),
    ]);

  const safeMonthlyData =
    monthlyData.length > 0 ? monthlyData[0] : { totalElpiji: 0, volume: 0 };

  const dailyAllo = Number(dailySummary._sum?.allocatedQty ?? 0);
  const dailyDistri = Number(distributionSummary._sum?.distributionQty ?? 0);

  const pending =
    (dailyAllo ?? 0) > (dailyDistri ?? 0)
      ? (dailyAllo ?? 0) - (dailyDistri ?? 0)
      : 0;

  const fakultatif =
    (dailyAllo ?? 0) >= safeMonthlyData.totalElpiji
      ? (dailyAllo ?? 0) - safeMonthlyData.totalElpiji
      : 0;

  const tidakTembus =
    safeMonthlyData.totalElpiji >= (dailyAllo ?? 0)
      ? (safeMonthlyData.totalElpiji ?? 0) - (dailyAllo ?? 0)
      : 0;

  return {
    dailySummary,
    distributionSummary,
    safeMonthlyData,
    pending,
    fakultatif,
    tidakTembus,
  };
};

export const getWeeklySummaryDefault = async () => {
  const today = new Date();
  const startMonth = startOfMonth(today);
  const endMonth = endOfMonth(today);
  const day = today.getDate();

  let startDate, endDate;

  if (day >= 1 && day <= 7) {
    startDate = startMonth;
    endDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 7);
  } else if (day >= 8 && day <= 14) {
    startDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 8);
    endDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 14);
  } else if (day >= 15 && day <= 21) {
    startDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 15);
    endDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 21);
  } else {
    startDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), 22);
    endDate = endMonth;
  }

  const [dailySummary, distributionSummary, monthlyData] =
    await prisma.$transaction([
      prisma.allocations.groupBy({
        by: ["giDate"],
        _sum: { allocatedQty: true },
        where: {
          giDate: { gte: startDate, lte: endDate },
        },
        orderBy: { giDate: "asc" },
      }),
      prisma.lpgDistributions.groupBy({
        by: ["giDate"],
        _sum: { distributionQty: true },
        where: {
          giDate: { gte: startDate, lte: endDate },
        },
        orderBy: { giDate: "asc" },
      }),
      prisma.monthlyAllocations.findMany({
        where: {
          date: { gte: startDate, lt: endDate },
        },
        select: { totalElpiji: true, date: true },
        orderBy: { date: "asc" },
      }),
    ]);

  const generateDateRange = (start: Date, end: Date) => {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(new Date(currentDate)); // Push sebagai object Date
      currentDate.setDate(currentDate.getDate() + 1); // Geser ke hari berikutnya
    }

    return dates;
  };

  const dateRange = generateDateRange(startDate, endDate);

  const weeklySummary = dateRange.map((date) => {
    const daily = dailySummary.find((item) => {
      if (!item.giDate) return false;
      return new Date(item.giDate).toDateString() === date.toDateString();
    });

    const distribution = distributionSummary.find(
      (item) => new Date(item.giDate).toDateString() === date.toDateString()
    );
    const monthly = monthlyData.find(
      (item) => new Date(item.date).toDateString() === date.toDateString()
    );

    return {
      date,
      dailySummary: daily?._sum?.allocatedQty || 0,
      totalElpiji: monthly?.totalElpiji || 0,
      distributionSummary: distribution?._sum?.distributionQty || 0,
    };
  });
  return { weeklySummary, startDate, endDate };
};

export const getYearlySummaryData = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);

  // Generate rentang bulan
  const months = eachMonthOfInterval({
    start: startOfYear,
    end: endOfYear,
  }).map((month) => ({
    startDate: new Date(Date.UTC(year, month.getMonth(), 1, 0, 0, 0, 0)),
    endDate: new Date(Date.UTC(year, month.getMonth() + 1, 0, 23, 59, 59, 999)),
  }));

  const allData = await Promise.all(
    months.map(async ({ startDate, endDate }) => {
      const [dailySummary, distributionSummary, monthlySummary] =
        await prisma.$transaction([
          prisma.allocations.groupBy({
            by: ["giDate"],
            _sum: { allocatedQty: true },
            where: { giDate: { gte: startDate, lte: endDate } },
            orderBy: { giDate: "asc" },
          }),
          prisma.lpgDistributions.groupBy({
            by: ["giDate"],
            _sum: { distributionQty: true },
            where: { giDate: { gte: startDate, lte: endDate } },
            orderBy: { giDate: "asc" },
          }),
          prisma.monthlyAllocations.findMany({
            where: {
              date: { gte: startDate, lt: endDate },
            },
            select: { totalElpiji: true, date: true },
          }),
        ]);
      return { dailySummary, distributionSummary, monthlySummary };
    })
  );

  // Fungsi untuk mengelompokkan berdasarkan bulan
  const groupByMonth = (data: any, key: any, dateKey = "giDate") => {
    return data.reduce((acc: any, item: any) => {
      const date = new Date(item[dateKey]);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      const existing = acc.find((m: any) => m.month === monthKey);
      if (!existing) {
        acc.push({
          month: monthKey,
          totalAllocated:
            key === "allocatedQty" ? item._sum?.allocatedQty || 0 : 0,
          totalDistributed:
            key === "distributionQty" ? item._sum?.distributionQty || 0 : 0,
          totalElpiji: key === "totalElpiji" ? item.totalElpiji || 0 : 0,
        });
      } else {
        if (key === "allocatedQty") {
          existing.totalAllocated += item._sum?.allocatedQty || 0;
        } else if (key === "distributionQty") {
          existing.totalDistributed += item._sum?.distributionQty || 0;
        } else if (key === "totalElpiji") {
          existing.totalElpiji += item.totalElpiji || 0;
        }
      }
      return acc;
    }, []);
  };

  const mergedData: any[] = [];
  allData.forEach(({ dailySummary, distributionSummary, monthlySummary }) => {
    const allocations = groupByMonth(dailySummary, "allocatedQty");
    const distributions = groupByMonth(distributionSummary, "distributionQty");
    const monthly = groupByMonth(monthlySummary, "totalElpiji", "date");

    allocations.forEach((alloc: any) => {
      const existing = mergedData.find((m) => m.month === alloc.month);
      if (!existing) {
        mergedData.push({ ...alloc });
      } else {
        existing.totalAllocated += alloc.totalAllocated;
      }
    });

    distributions.forEach((distri: any) => {
      const existing = mergedData.find((m) => m.month === distri.month);
      if (!existing) {
        mergedData.push({ ...distri });
      } else {
        existing.totalDistributed += distri.totalDistributed;
      }
    });
    monthly.forEach((month: any) => {
      const existing = mergedData.find((m) => m.month === month.month);
      if (!existing) {
        mergedData.push({ ...month });
      } else {
        existing.totalElpiji += month.totalElpiji;
      }
    });
  });

  return mergedData;
};

export const allDataDefault = async () => {
  const [allSummary, allDistributionSummary, allMonthlyData, uniqueDate] =
    await prisma.$transaction([
      prisma.allocations.aggregate({
        _sum: { allocatedQty: true },
        _count: { _all: true },
      }),
      prisma.lpgDistributions.aggregate({
        _sum: { distributionQty: true },
        _count: { _all: true },
      }),
      prisma.monthlyAllocations.aggregate({
        _sum: { totalElpiji: true },
        _count: { _all: true },
      }),
      prisma.lpgDistributions.findMany({
        distinct: ["giDate"], // Ambil tanggal unik
        select: {
          giDate: true, // Cuma ambil tanggalnya aja
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

  const dailyAllo = allSummary._sum?.allocatedQty;
  const dailyDistri = allDistributionSummary._sum?.distributionQty;
  const dailyMonthly = allMonthlyData._sum?.totalElpiji;

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

  console.log(allDistributionSummary._count?._all);

  const average = ((dailyAllo ?? 0) / totalProps).toFixed(2);

  return {
    allSummary,
    allDistributionSummary,
    allMonthlyData,
    pending,
    fakultatif,
    tidakTembus,
    average,
  };
};
