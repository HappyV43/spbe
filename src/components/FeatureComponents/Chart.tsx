import * as React from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from "recharts";
import {
  ChartConfig,
  ChartContainer,
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
  title?: string;
  timeFrame: "weekdays" | "monthly"; 
}

export function ChartComponent<TData extends DataItem>({
  data,
  config,
  title,
  timeFrame,
}: ChartProps<TData>) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No data
      </div>
    );
  }

  // Aggregate data based on weekdays or monthly selection
  const aggregatedData = React.useMemo(() => {
    const result: Record<string, number> = {};

    if (timeFrame === "monthly") {
      // Get all months in the current year
      const months = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).map((monthDate) => format(monthDate, "MMMM"));

      // Aggregate data by month
      data.forEach(({ qty, giDate }) => {
        const month = giDate; // Convert giDate to month name
        result[month] = (result[month] || 0) + qty;
      });

      // Return aggregated data but filter out months with 0 qty
      return months
        .map((month) => ({
          month,
          qty: result[month],
        }))
        // .filter(({ qty }) => qty > 0); // Exclude months with 0 qty
    } else if (timeFrame === "weekdays") {
      const startDate = startOfWeek(new Date());
      const endDate = endOfWeek(new Date());

      const weekdays = eachDayOfInterval({ start: startDate, end: endDate })
        .filter((day) => {
          const dayOfWeek = getDay(day);
          // Filter only Monday (1) to Friday (5)
          return dayOfWeek >= 1 && dayOfWeek <= 6;
        });

      data.forEach(({ qty, giDate }) => {
        const day = giDate;
        result[day] = (result[day] || 0) + qty;
      });

      return weekdays.map((day) => ({
        day: format(day, "dd-MM-yyyy"),
        qty: result[format(day, "dd-MM-yyyy")] || 0,
      }));
    }

    return [];
  }, [data, timeFrame]);

  const totalAllocated = React.useMemo(() => {
    return aggregatedData.reduce((acc, curr) => acc + curr.qty, 0);
  }, [aggregatedData]);

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-4 py-4">
      <div className="flex-grow my-5">
      <ChartContainer config={config} className="mx-auto w-full max-w-[600px] md:max-w-full aspect-square" style={{ height: '400px', maxHeight: '400px' }}>
      <AreaChart data={aggregatedData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
            <defs>
              <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={generateColor(0)} stopOpacity={0.8} />
                <stop offset="95%" stopColor={generateColor(0)} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={timeFrame === "monthly" ? "month" : "day"} tickLine={false} axisLine={false} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Area
              type="monotone"
              dataKey="qty"
              stroke={generateColor(0)}
              fillOpacity={1}
              fill="url(#colorQty)"
            >
              <LabelList dataKey="qty" position="top" />
            </Area>
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}