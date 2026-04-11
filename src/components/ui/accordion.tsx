"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionType = "single" | "multiple"

type AccordionContextValue = {
  collapsible: boolean
  openValues: string[]
  toggleValue: (value: string) => void
  type: AccordionType
}

type AccordionItemContextValue = {
  contentId: string
  isOpen: boolean
  triggerId: string
  value: string
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null)

function useAccordionContext() {
  const context = React.useContext(AccordionContext)

  if (!context) {
    throw new Error("Accordion components must be used within <Accordion>.")
  }

  return context
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext)

  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within <AccordionItem>."
    )
  }

  return context
}

function normalizeValue(
  type: AccordionType,
  value?: string | string[]
): string[] {
  if (value == null) {
    return []
  }

  if (Array.isArray(value)) {
    return type === "multiple" ? value : value.slice(0, 1)
  }

  return [value]
}

function Accordion({
  children,
  className,
  collapsible = false,
  defaultValue,
  type = "single",
  ...props
}: React.ComponentProps<"div"> & {
  collapsible?: boolean
  defaultValue?: string | string[]
  type?: AccordionType
}) {
  const [openValues, setOpenValues] = React.useState<string[]>(() =>
    normalizeValue(type, defaultValue)
  )

  function toggleValue(value: string) {
    setOpenValues((currentValue) => {
      const isOpen = currentValue.includes(value)

      if (type === "multiple") {
        return isOpen
          ? currentValue.filter((item) => item !== value)
          : [...currentValue, value]
      }

      if (isOpen) {
        return collapsible ? [] : currentValue
      }

      return [value]
    })
  }

  return (
    <AccordionContext.Provider
      value={{ collapsible, openValues, toggleValue, type }}
    >
      <div
        data-slot="accordion"
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  children,
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & {
  value: string
}) {
  const { openValues } = useAccordionContext()
  const isOpen = openValues.includes(value)
  const baseId = React.useId()

  return (
    <AccordionItemContext.Provider
      value={{
        contentId: `${baseId}-content`,
        isOpen,
        triggerId: `${baseId}-trigger`,
        value,
      }}
    >
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "border-b border-black/5 transition-colors last:border-0 dark:border-white/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleValue } = useAccordionContext()
  const { contentId, isOpen, triggerId, value } = useAccordionItemContext()

  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      data-state={isOpen ? "open" : "closed"}
      aria-controls={contentId}
      aria-expanded={isOpen}
      id={triggerId}
      className={cn(
        "group flex w-full items-center justify-between gap-4 py-5 text-left text-[0.95rem] font-bold text-slate-900 transition-all hover:text-primary dark:text-white dark:hover:text-primary",
        className
      )}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          toggleValue(value)
        }
      }}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "size-[1.15rem] shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-primary dark:text-white/40",
          isOpen && "rotate-180 text-primary dark:text-primary"
        )}
      />
    </button>
  )
}

function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { contentId, isOpen, triggerId } = useAccordionItemContext()

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      aria-hidden={!isOpen}
      aria-labelledby={triggerId}
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      id={contentId}
      role="region"
      {...props}
    >
      <div className="overflow-hidden">
        <div className="pb-5 text-sm font-medium leading-relaxed text-slate-600 dark:text-white/70">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }