import * as React from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateColor } from "@/utils/page";
import { format, startOfWeek, endOfWeek } from "date-fns";

interface DataItem {
  qty: number;
  agentName?: string;
  giDate: Date;
}

interface ChartProps<TData> {
  config: ChartConfig;
  data: Array<{ giDate: string; qty: number }>;
  data2: Array<{ giDate: string; qty: number }>; 
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
  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(new Date());
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
    return result;
  }, [data, data2]);

  const formatXAxis = (tickItem: string) => {
    if (timeFrame === "monthly") {
      const date = new Date(tickItem);
      return format(date, "MMM yyyy"); 
    }
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
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Area
              type="monotone"
              dataKey="dailyQty"
              stroke={generateColor(0)}
              fill="url(#colorQty)"
              dot={{ r: 4 }} 
            />
            <Area
              type="monotone"
              dataKey="monthlyQty"
              stroke={generateColor(10)}
              strokeWidth={2}
              fill="url(#colorQty)"
              dot={{ r: 4 }} 
              activeDot={{
                r: 6,
              }}
            /><LabelList dataKey="dailyQty" position="top" />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
