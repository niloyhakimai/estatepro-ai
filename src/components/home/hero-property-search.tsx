"use client"

import * as React from "react"

import { bedroomOptions, priceOptions } from "@/components/explore/explore-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type HeroPropertySearchProps = {
  locations: string[]
}

const quickFilters = ["City", "House", "Residential", "Apartment"] as const

export function HeroPropertySearch({ locations }: HeroPropertySearchProps) {
  const [lookingFor, setLookingFor] = React.useState("")
  const [selectedQuickFilter, setSelectedQuickFilter] =
    React.useState<(typeof quickFilters)[number]>("City")

  function handleQuickFilterSelect(filter: (typeof quickFilters)[number]) {
    setSelectedQuickFilter(filter)
    setLookingFor(filter === "City" ? "" : filter)
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 p-6 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.15)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)] sm:p-7 lg:p-8">
      <form action="/explore" className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-[1.9rem] font-semibold tracking-tight text-slate-900 dark:text-white">
            Find the best place
          </h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-white/70">
            Search live listings by location, price, and bedroom count.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <label
              htmlFor="hero-looking-for"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Looking for
            </label>
            <Input
              id="hero-looking-for"
              value={lookingFor}
              onChange={(event) => {
                setLookingFor(event.target.value)
                setSelectedQuickFilter("City")
              }}
              placeholder="Enter type"
              className="h-14 rounded-[1.15rem] border-black/10 bg-black/5 text-slate-900 shadow-none placeholder:text-slate-500 transition-all focus-visible:border-black/20 focus-visible:bg-black/10 focus-visible:ring-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/20 dark:focus-visible:bg-white/10 dark:focus-visible:ring-white/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hero-price"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Price
            </label>
            <Select name="price" defaultValue="any">
              <SelectTrigger 
                id="hero-price" 
                className="h-14 rounded-[1.15rem] border-black/10 bg-black/5 text-slate-900 shadow-none transition-all focus:border-black/20 focus:bg-black/10 focus:ring-1 focus:ring-black/20 data-[state=open]:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20 dark:focus:bg-white/10 dark:focus:ring-white/20 dark:data-[state=open]:bg-white/10"
              >
                <SelectValue placeholder="Select price" />
              </SelectTrigger>
              <SelectContent className="border-border/70 bg-popover/85 text-popover-foreground backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-white">
                {priceOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value} 
                    className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hero-location"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Locations
            </label>
            <Select name="location" defaultValue="any">
              <SelectTrigger 
                id="hero-location" 
                className="h-14 rounded-[1.15rem] border-black/10 bg-black/5 text-slate-900 shadow-none transition-all focus:border-black/20 focus:bg-black/10 focus:ring-1 focus:ring-black/20 data-[state=open]:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20 dark:focus:bg-white/10 dark:focus:ring-white/20 dark:data-[state=open]:bg-white/10"
              >
                <SelectValue placeholder="Any location" />
              </SelectTrigger>
              <SelectContent className="border-border/70 bg-popover/85 text-popover-foreground backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-white">
                <SelectItem value="any" className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white">
                  Any location
                </SelectItem>
                {locations.map((location) => (
                  <SelectItem 
                    key={location} 
                    value={location} 
                    className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white"
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="hero-bedrooms"
              className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
            >
              Number of rooms
            </label>
            <Select name="bedrooms" defaultValue="any">
              <SelectTrigger 
                id="hero-bedrooms" 
                className="h-14 rounded-[1.15rem] border-black/10 bg-black/5 text-slate-900 shadow-none transition-all focus:border-black/20 focus:bg-black/10 focus:ring-1 focus:ring-black/20 data-[state=open]:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20 dark:focus:bg-white/10 dark:focus:ring-white/20 dark:data-[state=open]:bg-white/10"
              >
                <SelectValue placeholder="Select rooms" />
              </SelectTrigger>
              <SelectContent className="border-border/70 bg-popover/85 text-popover-foreground backdrop-blur-xl dark:border-white/10 dark:bg-black/80 dark:text-white">
                {bedroomOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value} 
                    className="cursor-pointer focus:bg-secondary/60 dark:focus:bg-white/10 dark:focus:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 text-sm font-semibold text-slate-500 dark:text-white/60">Filter:</span>
            {quickFilters.map((filter) => {
              const isActive = selectedQuickFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "border-black/20 bg-black/10 text-slate-900 shadow-sm dark:border-white/20 dark:bg-white/20 dark:text-white"
                      : "border-black/10 bg-black/5 text-slate-600 hover:border-black/20 hover:bg-black/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                  onClick={() => {
                    handleQuickFilterSelect(filter)
                  }}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <Button
            type="submit"
            className="h-14 min-w-[13rem] rounded-[1.15rem] bg-slate-950 px-7 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
          >
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  )
}