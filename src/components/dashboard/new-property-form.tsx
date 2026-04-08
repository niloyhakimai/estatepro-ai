"use client"

import * as React from "react"
import { useActionState } from "react"

import {
  createProperty,
  type NewPropertyFormState,
} from "@/app/dashboard/admin/properties/new/actions"
import { DashboardSubmitButton } from "@/components/dashboard/dashboard-submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const initialState: NewPropertyFormState = {
  status: "idle",
}

export function NewPropertyForm() {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(createProperty, initialState)

  React.useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form ref={formRef} action={formAction} className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="property-title">Title</Label>
        <Input id="property-title" name="title" placeholder="Cedar Ridge Residence" required />
      </div>

      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="property-description">Description</Label>
        <Textarea
          id="property-description"
          name="description"
          placeholder="Describe the property, neighborhood highlights, condition, and any standout features."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-price">Price</Label>
        <Input id="property-price" name="price" type="number" min="1" step="0.01" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-location">Location</Label>
        <Input id="property-location" name="location" placeholder="Austin, Texas" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-bedrooms">Bedrooms</Label>
        <Input id="property-bedrooms" name="bedrooms" type="number" min="1" step="1" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-bathrooms">Bathrooms</Label>
        <Input id="property-bathrooms" name="bathrooms" type="number" min="1" step="1" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-area">Area (Sq Ft)</Label>
        <Input id="property-area" name="areaSqFt" type="number" min="1" step="0.01" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-images">Image URLs (Optional)</Label>
        <Textarea
          id="property-images"
          name="imageUrls"
          className="min-h-28"
          placeholder="Add one image URL per line or separate them with commas."
        />
      </div>

      <div className="space-y-4 lg:col-span-2">
        <p
          aria-live="polite"
          className={cn(
            "text-sm leading-7",
            state.status === "success"
              ? "text-primary"
              : state.status === "error"
                ? "text-destructive"
                : "text-muted-foreground"
          )}
        >
          {state.message ??
            "New listings will appear on the Explore page immediately after a successful save."}
        </p>
        <DashboardSubmitButton
          idleLabel="Publish property"
          pendingLabel="Publishing property"
        />
      </div>
    </form>
  )
}
