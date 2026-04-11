"use client"

import * as React from "react"
import { useActionState } from "react"

import {
  createProperty,
  type NewPropertyFormState,
} from "@/app/dashboard/admin/properties/new/actions"
import { DashboardSubmitButton } from "@/components/dashboard/dashboard-submit-button"
import { Input } from "@/components/ui/input"
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
    <form ref={formRef} action={formAction} className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-2.5 lg:col-span-2">
        <label htmlFor="property-title" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Title
        </label>
        <Input 
          id="property-title" 
          name="title" 
          placeholder="Cedar Ridge Residence" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5 lg:col-span-2">
        <label htmlFor="property-description" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Description
        </label>
        <Textarea
          id="property-description"
          name="description"
          placeholder="Describe the property, neighborhood highlights, condition, and any standout features."
          required
          className="min-h-[120px] resize-none rounded-[1.15rem] border-black/10 bg-white/50 p-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label htmlFor="property-price" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Price
        </label>
        <Input 
          id="property-price" 
          name="price" 
          type="number" 
          min="1" 
          step="0.01" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label htmlFor="property-location" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Location
        </label>
        <Input 
          id="property-location" 
          name="location" 
          placeholder="Austin, Texas" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label htmlFor="property-bedrooms" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Bedrooms
        </label>
        <Input 
          id="property-bedrooms" 
          name="bedrooms" 
          type="number" 
          min="1" 
          step="1" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label htmlFor="property-bathrooms" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Bathrooms
        </label>
        <Input 
          id="property-bathrooms" 
          name="bathrooms" 
          type="number" 
          min="1" 
          step="1" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5 lg:col-span-2">
        <label htmlFor="property-area" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Area (Sq Ft)
        </label>
        <Input 
          id="property-area" 
          name="areaSqFt" 
          type="number" 
          min="1" 
          step="0.01" 
          required 
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5 lg:col-span-2">
        <label htmlFor="property-images" className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60">
          Image URLs (Optional)
        </label>
        <Textarea
          id="property-images"
          name="imageUrls"
          className="min-h-[120px] resize-none rounded-[1.15rem] border-black/10 bg-white/50 p-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
          placeholder="Add one image URL per line or separate them with commas."
        />
      </div>

      <div className="space-y-4 pt-2 lg:col-span-2">
        <p
          aria-live="polite"
          className={cn(
            "px-1 text-[0.8rem] font-medium leading-relaxed transition-colors",
            state.status === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : state.status === "error"
                ? "text-red-500"
                : "text-slate-500 dark:text-white/50"
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