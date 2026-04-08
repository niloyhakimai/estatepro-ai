"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const chartColors = [
  "var(--primary)",
  "var(--accent)",
  "var(--secondary-foreground)",
  "var(--muted-foreground)",
]

type UserInterestChartProps = {
  data: Array<{
    count: number
    label: string
  }>
}

export function UserInterestChart({ data }: UserInterestChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-[1.7rem] border border-dashed border-border/70 bg-background/60 px-6 text-center text-sm leading-7 text-muted-foreground">
        Your property-interest chart will appear here after you submit inquiries.
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-center">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                borderRadius: 18,
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--foreground)",
              }}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-3 rounded-full"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              <span className="text-foreground">{item.label}</span>
            </div>
            <span className="font-semibold text-foreground">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
