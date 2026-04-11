import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewPropertyForm } from "@/components/dashboard/new-property-form"

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Card className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_30px_100px_-58px_rgba(15,23,42,0.15)] backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_30px_100px_-58px_rgba(0,0,0,0.8)]">
        <CardHeader className="space-y-4 border-b border-black/5 bg-black/[0.02] p-8 transition-colors dark:border-white/10 dark:bg-white/[0.02] sm:p-10">
          <Badge 
            variant="secondary" 
            className="w-fit bg-primary/10 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20"
          >
            Add New Property
          </Badge>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Publish a listing to the live catalog
          </CardTitle>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-white/70">
            Capture the essentials for a new property so it is immediately
            available across Explore and the admin dashboard.
          </p>
        </CardHeader>
        <CardContent className="p-8 sm:p-10">
          <NewPropertyForm />
        </CardContent>
      </Card>
    </div>
  )
}