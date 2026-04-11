"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, LoaderCircle, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type AiSearchFilters = {
  bedrooms: "1plus" | "2plus" | "3plus" | "4plus" | "any"
  location: string
  price: "500k-1m" | "1m-2m" | "any" | "over-2m" | "under-500k"
}

type AiSearchFormProps = {
  className?: string
  compact?: boolean
  description?: string
  title?: string
}

function buildExploreHref(filters: AiSearchFilters) {
  const params = new URLSearchParams()

  if (filters.location) {
    params.set("location", filters.location)
  }

  if (filters.price !== "any") {
    params.set("price", filters.price)
  }

  if (filters.bedrooms !== "any") {
    params.set("bedrooms", filters.bedrooms)
  }

  const queryString = params.toString()
  return queryString ? `/explore?${queryString}` : "/explore"
}

export function AiSearchForm({
  className,
  compact = false,
  description = "Describe the home you want in one sentence and we will translate it into live EstatePro filters.",
  title = "Magic AI Search",
}: AiSearchFormProps) {
  const router = useRouter()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [prompt, setPrompt] = React.useState("")
  const [error, setError] = React.useState("")
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuggestionsLoading, setIsSuggestionsLoading] = React.useState(false)
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [isNavigating, startTransition] = React.useTransition()

  const showSuggestions =
    isDropdownOpen &&
    prompt.trim().length >= 2 &&
    (isSuggestionsLoading || suggestions.length > 0)

  const runAiSearch = React.useCallback(
    async (nextPrompt: string) => {
      const trimmedPrompt = nextPrompt.trim()

      setSuggestions([])
      setHighlightedIndex(-1)
      setIsDropdownOpen(false)

      if (!trimmedPrompt) {
        setError("Please describe what kind of property you want.")
        return
      }

      setError("")
      setIsSubmitting(true)

      try {
        const response = await fetch("/api/ai-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: trimmedPrompt }),
        })

        const data = (await response.json()) as {
          error?: string
          filters?: AiSearchFilters
        }

        if (!response.ok || !data.filters) {
          throw new Error(
            data.error ??
              "We could not translate that request into filters right now."
          )
        }

        const filters = data.filters

        startTransition(() => {
          router.push(buildExploreHref(filters))
        })
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "We could not translate that request into filters right now."
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [router]
  )

  React.useEffect(() => {
    const trimmedPrompt = prompt.trim()

    if (trimmedPrompt.length < 2) {
      setSuggestions([])
      setHighlightedIndex(-1)
      setIsSuggestionsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setIsSuggestionsLoading(true)

      try {
        const response = await fetch(
          `/api/suggestions?q=${encodeURIComponent(trimmedPrompt)}`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error("Suggestions are unavailable.")
        }

        const data = (await response.json()) as {
          suggestions?: string[]
        }

        const nextSuggestions = Array.isArray(data.suggestions)
          ? data.suggestions
          : []

        setSuggestions(nextSuggestions)
        setHighlightedIndex(nextSuggestions.length > 0 ? 0 : -1)
        setIsDropdownOpen(true)
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return
        }

        setSuggestions([])
        setHighlightedIndex(-1)
      } finally {
        setIsSuggestionsLoading(false)
      }
    }, 300)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [prompt])

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await runAiSearch(prompt)
  }

  async function handleSuggestionSelect(suggestion: string) {
    setPrompt(suggestion)
    await runAiSearch(suggestion)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value)
    setError("")
    setHighlightedIndex(-1)
    setIsDropdownOpen(true)
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || suggestions.length === 0) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false)
      }

      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHighlightedIndex((currentIndex) =>
        currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0
      )
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlightedIndex((currentIndex) =>
        currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1
      )
      return
    }

    if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault()
      void handleSuggestionSelect(suggestions[highlightedIndex])
      return
    }

    if (event.key === "Escape") {
      setIsDropdownOpen(false)
    }
  }

  return (
    <Card
      className={cn(
        "relative isolate overflow-visible rounded-[2rem] border border-black/5 bg-white/60 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.15)] backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-black/40 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)]",
        showSuggestions ? "z-[80]" : "z-0",
        className
      )}
    >
      <CardContent className={cn("space-y-5", compact ? "p-5" : "p-6 sm:p-8")}>
        <div
          className={cn(
            "gap-5",
            compact
              ? "grid xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center"
              : "space-y-4"
          )}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-[0.65rem] uppercase tracking-[0.2em] text-primary dark:bg-primary/20"
              >
                {title}
              </Badge>
              <span className="inline-flex size-9 items-center justify-center rounded-xl border border-black/5 bg-black/5 text-primary shadow-sm dark:border-white/10 dark:bg-white/5">
                <Sparkles className="size-4" />
              </span>
            </div>
            {!compact && (
              <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/70">
                {description}
              </p>
            )}
          </div>

          {compact ? (
            <div className="flex flex-wrap gap-2">
              {["Smart UI", "AI Search", "Verified"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/5 bg-black/5 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-white/40"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
          className={cn(
            "relative grid gap-4",
            compact
              ? "lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
              : "xl:grid-cols-[minmax(0,1fr)_auto]"
          )}
        >
          <div
            ref={containerRef}
            className={cn("relative", showSuggestions && "z-[90]")}
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 z-[1] size-4 -translate-y-1/2 text-slate-400 transition-colors dark:text-white/40" />
            <Input
              value={prompt}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => {
                if (suggestions.length > 0 || prompt.trim().length >= 2) {
                  setIsDropdownOpen(true)
                }
              }}
              placeholder='Try: "Find me a cheap 3-bedroom place in Austin"'
              className="h-14 rounded-[1.2rem] border-black/10 bg-black/5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
            />

            {showSuggestions ? (
              <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-[1.35rem] border border-black/5 bg-white/95 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 dark:border-white/10 dark:bg-black/90 dark:shadow-2xl">
                <div className="border-b border-black/5 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:text-white/40">
                  Live suggestions
                </div>

                {isSuggestionsLoading ? (
                  <div className="flex items-center gap-2 px-4 py-4 text-sm text-slate-500 dark:text-white/60">
                    <LoaderCircle className="size-4 animate-spin text-primary" />
                    Analyzing market data...
                  </div>
                ) : (
                  <div className="p-1.5">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all",
                          highlightedIndex === index
                            ? "bg-black/5 text-slate-900 dark:bg-white/10 dark:text-white"
                            : "text-slate-600 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
                        )}
                        onMouseEnter={() => {
                          setHighlightedIndex(index)
                        }}
                        onClick={() => {
                          void handleSuggestionSelect(suggestion)
                        }}
                      >
                        <span
                          className={cn(
                            "inline-flex size-8 items-center justify-center rounded-full transition-colors",
                            highlightedIndex === index
                              ? "bg-primary/20 text-primary"
                              : "bg-primary/10 text-primary/70"
                          )}
                        >
                          <Search className="size-3.5" />
                        </span>
                        <span
                          className={cn(
                            "truncate",
                            highlightedIndex === index && "font-medium"
                          )}
                        >
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-14 rounded-[1.2rem] bg-slate-900 px-7 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
            disabled={isSubmitting || isNavigating}
          >
            {isSubmitting || isNavigating ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {isSubmitting || isNavigating ? "Analyzing..." : "Run AI Search"}
            {!isSubmitting && !isNavigating && <ArrowRight className="size-4" />}
          </Button>
        </form>

        <p
          aria-live="polite"
          className={cn(
            "px-1 text-xs leading-relaxed transition-colors",
            error ? "font-semibold text-red-500" : "text-slate-500 dark:text-white/40"
          )}
        >
          {error ||
            "Our AI understands natural language—simply describe your ideal lifestyle and we'll handle the rest."}
        </p>
      </CardContent>
    </Card>
  )
}