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
        "relative isolate overflow-visible",
        showSuggestions ? "z-[80]" : "z-0",
        className
      )}
    >
      <CardContent className={cn("space-y-4", compact ? "p-4" : "p-5")}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="accent">{title}</Badge>
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{description}</p>
        </div>

        <form
          onSubmit={(event) => {
            void handleSubmit(event)
          }}
          className={cn(
            "relative grid gap-3",
            compact ? "md:grid-cols-[minmax(0,1fr)_auto]" : "lg:grid-cols-[minmax(0,1fr)_auto]"
          )}
        >
          <div
            ref={containerRef}
            className={cn("relative", showSuggestions && "z-[90]")}
          >
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
              className="h-12 rounded-2xl"
            />

            {showSuggestions ? (
              <div className="absolute top-full right-0 left-0 z-[100] mt-2 overflow-hidden rounded-[1.35rem] border border-border/70 bg-popover/95 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.82)] backdrop-blur-xl">
                <div className="border-b border-border/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Live suggestions
                </div>

                {isSuggestionsLoading ? (
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                    <LoaderCircle className="size-4 animate-spin text-primary" />
                    Searching available listings
                  </div>
                ) : (
                  <div className="p-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="flex w-full items-center gap-3 rounded-[1rem] px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary/75"
                        onMouseEnter={() => {
                          setHighlightedIndex(suggestions.indexOf(suggestion))
                        }}
                        onClick={() => {
                          void handleSuggestionSelect(suggestion)
                        }}
                      >
                        <span
                          className={cn(
                            "inline-flex size-8 items-center justify-center rounded-full text-primary",
                            highlightedIndex === suggestions.indexOf(suggestion)
                              ? "bg-primary/16"
                              : "bg-primary/10"
                          )}
                        >
                          <Search className="size-4" />
                        </span>
                        <span
                          className={cn(
                            "truncate",
                            highlightedIndex === suggestions.indexOf(suggestion) &&
                              "font-medium"
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
            className="rounded-2xl"
            disabled={isSubmitting || isNavigating}
          >
            <Sparkles className="size-4" />
            {isSubmitting || isNavigating ? "Finding matches" : "Run AI Search"}
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <p
          aria-live="polite"
          className={cn(
            "text-sm leading-7",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {error ||
            "The AI maps your request into the same location, price, and bedroom filters used on the Explore page."}
        </p>
      </CardContent>
    </Card>
  )
}
