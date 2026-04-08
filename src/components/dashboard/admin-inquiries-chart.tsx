"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { BarChart3 } from "lucide-react"

type AdminInquiriesChartProps = {
  data: Array<{
    inquiries: number
    title: string
  }>
}

const CHART_BAR_COLOR = "var(--primary)"
const CHART_GRID_COLOR = "var(--border)"
const CHART_LABEL_COLOR = "var(--muted-foreground)"

function truncateLabel(value: string) {
  return value.length > 15 ? `${value.slice(0, 15)}...` : value
}

// Robust Custom Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<number, string>) => {
  if (active && payload && payload.length) {
    const displayLabel = typeof label === "string" ? label : String(label ?? "")

    return (
      <div className="rounded-xl border border-border/60 bg-background/95 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-primary/10">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">Engagement Metrics</p>
        <p className="text-sm font-bold text-foreground mb-3 leading-tight">{displayLabel}</p>
        <div className="flex items-center gap-3 border-t border-border/40 pt-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="size-3 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Inquiries: <span className="text-foreground font-bold">{payload[0]?.value ?? 0}</span>
          </p>
        </div>
      </div>
    )
  }
  return null
}

export function AdminInquiriesChart({ data }: AdminInquiriesChartProps) {
  // Safe check for data
  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border/60 bg-secondary/5 px-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-background shadow-sm text-muted-foreground">
          <BarChart3 className="size-6 opacity-50" />
        </div>
        <div className="space-y-2 max-w-sm">
          <p className="text-lg font-bold text-foreground">Awaiting Analytics</p>
          <p className="text-sm leading-relaxed text-muted-foreground font-medium">
            Once your elite properties receive buyer inquiries, real-time engagement data will be visualized here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-80 w-full animate-in fade-in duration-1000">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 10, left: -25, bottom: 20 }}
          barSize={45}
        >
          <CartesianGrid 
            strokeDasharray="4 4" 
            vertical={false} 
            stroke={CHART_GRID_COLOR}
            strokeOpacity={0.4}
          />
          
          <XAxis
            dataKey="title"
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-15}
            textAnchor="end"
            height={70}
            dy={10}
            tick={{ fill: CHART_LABEL_COLOR, fontSize: 10, fontWeight: 700 }}
            tickFormatter={truncateLabel}
          />
          
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tick={{ fill: CHART_LABEL_COLOR, fontSize: 11, fontWeight: 700 }}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: CHART_BAR_COLOR, fillOpacity: 0.08, radius: 12 }}
            animationDuration={200}
          />
          
          <Bar 
            dataKey="inquiries" 
            fill={CHART_BAR_COLOR}
            radius={[12, 12, 0, 0]} 
            animationDuration={1500}
            animationBegin={200}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                className="transition-all duration-300 cursor-pointer hover:opacity-80 active:scale-95"
                fill={CHART_BAR_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
