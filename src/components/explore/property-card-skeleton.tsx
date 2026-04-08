import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/40 bg-background/60 shadow-lg backdrop-blur-sm rounded-[2.5rem]">
      <CardContent className="space-y-6 p-5">
        <Skeleton className="aspect-[4/3] w-full rounded-[2rem] bg-secondary/50" />
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2.5">
            <Skeleton className="h-7 w-4/5 bg-secondary/50" />
            <Skeleton className="h-4 w-3/5 bg-secondary/50" />
          </div>
          
          <Skeleton className="h-8 w-2/5 bg-secondary/50" />
          
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Skeleton className="h-20 rounded-2xl bg-secondary/50" />
            <Skeleton className="h-20 rounded-2xl bg-secondary/50" />
            <Skeleton className="h-20 rounded-2xl bg-secondary/50" />
          </div>
        </div>
        
        <Skeleton className="h-12 w-full rounded-xl mt-4 bg-secondary/50" />
      </CardContent>
    </Card>
  )
}