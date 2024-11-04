import * as React from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateColor } from "@/utils/page";
import { format, eachDayOfInterval, eachMonthOfInterval, startOfMonth, endOfMonth, getDay, startOfWeek, endOfWeek, startOfYear, endOfYear } from "date-fns";

// Interface for the data item
interface DataItem {
  qty: number;
  agentName?: string;
  giDate: Date;
}

// Adjusted ChartProps to handle both daily and monthly data
interface ChartProps<TData> {
  config: ChartConfig;
  data: Array<{ giDate: string; qty: number }>; // allow day or month
  data2: Array<{ giDate: string; qty: number }>; // allow day or month
  title?: string;
  timeFrame: "weekdays" | "monthly"; 
}

export function ChartComponent<TData extends DataItem>({
  data,
  data2,
  config,
  title,
  timeFrame,
}: ChartProps<TData>) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 py-4">No data</div>;
  }
  // console.log(data)
  // console.log(data2)

  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(new Date());

  // Aggregate data based on weekdays or monthly selection
  // const [aggregatedData, aggregatedData2] = React.useMemo(() => {
  //   const processData = (inputData: typeof data) => {
  //     const result: Record<string, number> = {};

  //     if (timeFrame === "monthly") {
  //       const months = eachMonthOfInterval({
  //         start: startOfYear(new Date()),
  //         end: endOfYear(new Date()),
  //       }).map((monthDate) => format(monthDate, "MMMM"));

  //       inputData.forEach(({ qty, giDate }) => {
  //         const month = giDate;
  //         result[month] = (result[month] || 0) + qty;
  //       });

  //       return months.map((month) => ({
  //         month,
  //         qty: result[month] || 0,
  //       }));
  //     } else if (timeFrame === "weekdays") {
  //       const weekdays = eachDayOfInterval({ start: startDate, end: endDate })
  //         .map((day) => format(day, "dd-MM-yyyy"));

  //       inputData.forEach(({ qty, giDate }) => {
  //         const day = giDate;
  //         result[day] = (result[day] || 0) + qty;
  //       });

  //       return weekdays.map((day) => ({
  //         day,
  //         qty: result[day] || 0,
  //       }));
  //     }

  //     return [];
  //   };

  //   return [processData(data), processData(data2)];
  // }, [data, data2, timeFrame]);


  const combinedData = React.useMemo(() => {
    const map = new Map<string, { giDate: string; dailyQty?: number; monthlyQty?: number }>();
  
    // Process data as dailyQty
    data.forEach(({ giDate, qty }) => {
      if (!map.has(giDate)) {
        map.set(giDate, { giDate, dailyQty: qty });
      } else {
        map.get(giDate)!.dailyQty = qty;
      }
    });
  
    // Process data2 as monthlyQty
    data2.forEach(({ giDate, qty }) => {
      if (!map.has(giDate)) {
        map.set(giDate, { giDate, monthlyQty: qty });
      } else {
        map.get(giDate)!.monthlyQty = qty;
      }
    });
  
    const result = Array.from(map.values());
    console.log("Combined Data:", result);
    return result;
  }, [data, data2]);

  const formatXAxis = (tickItem: string) => {
    if (timeFrame === "monthly") {
      const date = new Date(tickItem);
      return format(date, "MMM yyyy"); // Format for months
    }
    // Default to daily formatting
    return format(new Date(tickItem), "dd-MM-yyyy"); 
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-4 py-4">
      <div className="flex-grow my-5">
      <ChartContainer config={config} className="mx-auto w-full max-w-[600px] md:max-w-full aspect-square" style={{ height: '400px', maxHeight: '400px' }}>
      <AreaChart data={combinedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="giDate" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="dailyQty" stroke={generateColor(0)} fill="url(#colorQty)" />
        <Area type="monotone" dataKey="monthlyQty" stroke={generateColor(10)} fill="url(#colorQty)" />
        <LabelList dataKey="dailyQty" position="top" />
      </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
