
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { status: "Full Independence", percentage: 12 },
  { status: "Some Assistance", percentage: 38 },
  { status: "Heavy Reliance", percentage: 50 },
];

const chartConfig = {
  percentage: {
    label: "% of Diners",
  },
  independence: { label: "Full Independence", color: "#34d399" }, // Green
  assistance: { label: "Some Assistance", color: "#f59e0b" },   // Amber
  reliance: { label: "Heavy Reliance", color: "#ef4444" },     // Red
} satisfies ChartConfig;

export function AccessibilityChart() {
  return (
    <div className="bg-slate-200/50 p-6 md:p-8 rounded-lg border border-slate-300/50 h-full">
      <h3 className="text-2xl font-heading font-bold text-dark-text mb-2">The Independence Gap</h3>
      <p className="text-medium-text mb-6 max-w-md">
        Current dining experiences often create dependence. Here's how visually impaired diners describe their level of autonomy:
      </p>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full text-dark-text">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.05)" />
          <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: 'currentColor', fontSize: 14, fontFamily: 'Inter' }}
            width={140}
          />
          <XAxis dataKey="percentage" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" labelClassName="font-bold" className="bg-white/80 backdrop-blur-sm" />}
          />
          <Bar dataKey="percentage" layout="vertical" radius={5} barSize={35}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={
                entry.status === "Full Independence" ? chartConfig.independence.color :
                entry.status === "Some Assistance" ? chartConfig.assistance.color :
                chartConfig.reliance.color
              } />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
