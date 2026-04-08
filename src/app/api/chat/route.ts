import Groq from "groq-sdk"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

type ChatMessage = {
  content: string
  role: "assistant" | "user"
}

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing.")
  }

  return new Groq({ apiKey })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] }
    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message): message is ChatMessage =>
              !!message &&
              (message.role === "assistant" || message.role === "user") &&
              typeof message.content === "string" &&
              message.content.trim().length > 0
          )
          .slice(-8)
      : []

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please send at least one chat message." },
        { status: 400 }
      )
    }

    const groq = getGroqClient()
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are EstatePro's AI assistant. Help users with general real estate questions, explain the buying process, and suggest they visit the /explore page when it is relevant. Be concise, helpful, and professional.",
        },
        ...messages,
      ],
    })

    const content = completion.choices[0]?.message?.content?.trim()

    if (!content) {
      return NextResponse.json(
        { error: "The assistant did not return a message." },
        { status: 502 }
      )
    }

    return NextResponse.json({ message: content })
  } catch (error) {
    if (error instanceof Error && error.message === "GROQ_API_KEY is missing.") {
      return NextResponse.json(
        { error: "The assistant is not configured yet. Add GROQ_API_KEY to enable it." },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error:
          "The assistant could not respond right now. Please try again in a moment.",
      },
      { status: 500 }
    )
  }
}
