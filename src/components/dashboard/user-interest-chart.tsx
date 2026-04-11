"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Premium color palette matching the luxury theme
const chartColors = [
  "#29c2b3", // Signature Teal
  "#b8f579", // Lime Green Glow
  "#1e293b", // Deep Slate
  "#94a3b8", // Soft Slate
  "#0ea5e9", // Accent Blue
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
      <div className="flex min-h-[18rem] items-center justify-center rounded-[2rem] border-2 border-dashed border-black/10 bg-black/[0.02] px-6 text-center text-sm font-medium leading-relaxed text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/50">
        Your property-interest chart will appear here after you submit inquiries.
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center">
      <div className="h-[20rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "1.25rem",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(15, 23, 42, 0.95)",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                color: "#fff",
                fontWeight: 600,
                padding: "12px 20px",
              }}
              itemStyle={{
                color: "#e2e8f0",
                fontSize: "0.85rem",
              }}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={5}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={chartColors[index % chartColors.length]}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{ outline: "none" }}
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
            className="group flex items-center justify-between gap-4 rounded-[1.15rem] border border-black/5 bg-white/60 px-4 py-3.5 shadow-sm backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/80 dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/60"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex size-3.5 shrink-0 rounded-full shadow-inner"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600 transition-colors group-hover:text-slate-900 dark:text-white/70 dark:group-hover:text-white">
                {item.label}
              </span>
            </div>
            <span className="text-base font-black text-slate-900 dark:text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}