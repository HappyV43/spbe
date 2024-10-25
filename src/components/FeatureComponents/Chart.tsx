import * as React from "react";
import { Pie, PieChart, Tooltip, Label, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { generateColor } from "@/utils/color";
import { Legend } from "./Legend";

interface ChartProps<TData> {
  config: ChartConfig;
  data: TData[];
  title?: string;
}

export function ChartComponent<
  TData extends { qty: number; agentName: string }
>({ data, config, title }: ChartProps<TData>) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 py-4">No data</div>;
  }

  const aggregatedData = React.useMemo(() => {
    const result: Record<string, number> = {};
    data.forEach(({ qty, agentName }) => {
      result[agentName] = (result[agentName] || 0) + qty;
    });
    return Object.entries(result).map(([agentName, qty]) => ({
      agentName,
      qty,
    }));
  }, [data]);

  const totalAllocated = React.useMemo(() => {
    return aggregatedData.reduce((acc, curr) => acc + curr.qty, 0);
  }, [aggregatedData]);

  const pieData = aggregatedData.map((entry, index) => ({
    ...entry,
    fill: generateColor(index),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-white p-2 rounded border shadow">
          <p className="font-bold">{name}</p>
          <p>{`Allocated: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-4 py-4">
      {/* <div className="flex-grow h-72 md:h-auto">
        <ChartContainer config={config} className="mx-auto w-full max-w-[400px] md:max-w-full aspect-square"> */}
      <div className="flex-grow">
        <ChartContainer
          config={config}
          className="mx-auto w-full max-w-[400px] md:max-w-full aspect-square"
          style={{ height: "auto", maxHeight: "400px" }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="qty"
              nameKey="agentName"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAllocated.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {title}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex-shrink-0 w-full md:w-40 max-h-80 md:overflow-y-auto p-0">
        <Legend data={pieData} />
      </div>
    </div>
  );
}
