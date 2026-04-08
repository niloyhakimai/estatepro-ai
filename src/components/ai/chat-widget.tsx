"use client"

import * as React from "react"
import { LoaderCircle, MessageCircle, Send, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ChatMessage = {
  content: string
  role: "assistant" | "user"
}

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm the EstatePro assistant. Ask me about buying steps, timelines, or where to start your property search.",
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState("")
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [isOpen, messages])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput || isSubmitting) {
      return
    }

    const nextMessages = [
      ...messages,
      {
        role: "user" as const,
        content: trimmedInput,
      },
    ]

    setMessages(nextMessages)
    setInput("")
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = (await response.json()) as {
        error?: string
        message?: string
      }

      if (!response.ok || !data.message) {
        throw new Error(
          data.error ?? "The assistant could not respond right now."
        )
      }

      const assistantMessage = data.message

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: assistantMessage,
        },
      ])
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not respond right now."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <Card className="mb-4 flex h-[32rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden border-border/70 bg-card/92 shadow-[0_32px_100px_-48px_rgba(15,23,42,0.82)] backdrop-blur-xl">
          <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-border/60">
            <div className="space-y-2">
              <Badge variant="accent">AI Assistant</Badge>
              <div>
                <CardTitle className="text-xl">EstatePro Chat</CardTitle>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Ask about buying steps, neighborhood questions, or where to
                  start.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat widget"
            >
              <X className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4">
            <div
              ref={scrollContainerRef}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-7 shadow-sm",
                    message.role === "assistant"
                      ? "self-start bg-background/78 text-foreground"
                      : "self-end bg-primary text-primary-foreground"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isSubmitting ? (
                <div className="self-start rounded-[1.4rem] bg-background/78 px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin" />
                    Assistant is thinking
                  </span>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                void handleSubmit(event)
              }}
              className="space-y-3 border-t border-border/60 pt-4"
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a real estate question"
                className="h-11 rounded-2xl"
              />
              <div className="flex items-center justify-between gap-3">
                <p
                  aria-live="polite"
                  className={cn(
                    "text-xs leading-6",
                    error ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {error || "Responses are generated by Groq for fast guidance."}
                </p>
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-2xl"
                  disabled={isSubmitting || !input.trim()}
                >
                  <Send className="size-4" />
                  Send
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <Button
        type="button"
        size="icon-lg"
        className="rounded-full shadow-[0_18px_50px_-22px_rgba(15,118,110,0.8)]"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </div>
  )
}
