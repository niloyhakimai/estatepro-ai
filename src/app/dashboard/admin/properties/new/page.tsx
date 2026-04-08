import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewPropertyForm } from "@/components/dashboard/new-property-form"

export default function NewPropertyPage() {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          Add New Property
        </Badge>
        <CardTitle className="text-3xl">Publish a listing to the live catalog</CardTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          Capture the essentials for a new property so it is immediately
          available across Explore and the admin dashboard.
        </p>
      </CardHeader>
      <CardContent>
        <NewPropertyForm />
      </CardContent>
    </Card>
  )
}
