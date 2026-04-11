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

    // Give the DOM a moment to paint before scrolling
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }, 50)
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
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <Card className="mb-4 flex h-[36rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/60 shadow-[0_38px_110px_-42px_rgba(15,23,42,0.25)] backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-black/60 dark:shadow-[0_38px_110px_-42px_rgba(0,0,0,0.8)]">
          
          <CardHeader className="flex flex-row items-start justify-between gap-3 border-b border-black/5 bg-white/40 p-6 transition-colors dark:border-white/10 dark:bg-black/20">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-primary/10 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-primary shadow-sm dark:bg-primary/20">
                AI Assistant
              </Badge>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">EstatePro Chat</CardTitle>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-500 dark:text-white/60">
                  Ask about buying steps, neighborhood questions, or where to
                  start.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-full border-black/10 bg-white/50 text-slate-500 shadow-sm transition-colors hover:bg-black/5 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat widget"
            >
              <X className="size-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex min-h-0 flex-1 flex-col p-0">
            
            <div
              ref={scrollContainerRef}
              className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "max-w-[88%] px-5 py-3.5 text-[0.9rem] font-medium leading-relaxed shadow-sm",
                    message.role === "assistant"
                      ? "self-start rounded-[1.4rem] rounded-tl-sm border border-black/5 bg-white/90 text-slate-700 backdrop-blur-md dark:border-white/5 dark:bg-white/10 dark:text-white/90"
                      : "self-end rounded-[1.4rem] rounded-tr-sm bg-slate-900 text-white dark:bg-[#b8f579] dark:text-black"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isSubmitting ? (
                <div className="self-start rounded-[1.4rem] rounded-tl-sm border border-black/5 bg-white/90 px-5 py-3.5 text-[0.9rem] font-medium text-slate-500 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/10 dark:text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <LoaderCircle className="size-4 animate-spin text-primary" />
                    Assistant is thinking...
                  </span>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                void handleSubmit(event)
              }}
              className="space-y-3 border-t border-black/5 bg-white/40 p-5 transition-colors dark:border-white/10 dark:bg-black/20"
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a real estate question..."
                className="h-12 rounded-[1.15rem] border-black/10 bg-white/60 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/40 dark:text-white dark:placeholder:text-white/40 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/60 dark:focus-visible:ring-white/10"
              />
              <div className="flex items-center justify-between gap-3 px-1">
                <p
                  aria-live="polite"
                  className={cn(
                    "text-[0.65rem] font-bold uppercase tracking-wider",
                    error ? "text-red-500" : "text-slate-400 dark:text-white/40"
                  )}
                >
                  {error || "Powered by Groq AI"}
                </p>
                <Button
                  type="submit"
                  size="sm"
                  className="h-9 rounded-[0.85rem] bg-slate-900 px-4 font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 active:scale-95 disabled:hover:translate-y-0 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_10px_20px_-10px_rgba(184,245,121,0.5)] dark:hover:bg-[#a6e55d]"
                  disabled={isSubmitting || !input.trim()}
                >
                  <Send className="mr-1.5 size-3.5" />
                  Send
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <Button
        type="button"
        size="icon"
        className="size-14 rounded-full bg-slate-900 text-white shadow-[0_18px_40px_-15px_rgba(15,23,42,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 dark:bg-[#b8f579] dark:text-black dark:shadow-[0_18px_40px_-15px_rgba(184,245,121,0.6)] dark:hover:bg-[#a6e55d]"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </div>
  )
}