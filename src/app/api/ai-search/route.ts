import Groq from "groq-sdk"
import { NextResponse } from "next/server"

const aiSearchPriceValues = [
  "any",
  "under-500k",
  "500k-1m",
  "1m-2m",
  "over-2m",
] as const

const aiSearchBedroomValues = [
  "any",
  "1plus",
  "2plus",
  "3plus",
  "4plus",
] as const

type AiSearchPrice = (typeof aiSearchPriceValues)[number]
type AiSearchBedrooms = (typeof aiSearchBedroomValues)[number]

type AiSearchResponse = {
  bedrooms: AiSearchBedrooms
  location: string
  price: AiSearchPrice
}

const priceValueSet = new Set<string>(aiSearchPriceValues)
const bedroomValueSet = new Set<string>(aiSearchBedroomValues)

export const runtime = "nodejs"

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing.")
  }

  return new Groq({ apiKey })
}

function bucketPriceValue(amount: number): AiSearchPrice {
  if (amount < 500_000) {
    return "under-500k"
  }

  if (amount < 1_000_000) {
    return "500k-1m"
  }

  if (amount < 2_000_000) {
    return "1m-2m"
  }

  return "over-2m"
}

function parseBudgetValue(value: string): number | null {
  const normalized = value.trim().toLowerCase()
  const match = normalized
    .replaceAll(",", "")
    .replaceAll("$", "")
    .match(/(\d+(?:\.\d+)?)(?:\s*)(k|m|million|thousand)?/)

  if (!match) {
    return null
  }

  const amount = Number(match[1])

  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  const unit = match[2]

  if (unit === "k" || unit === "thousand") {
    return amount * 1_000
  }

  if (unit === "m" || unit === "million") {
    return amount * 1_000_000
  }

  return amount
}

function normalizePriceValue(value: unknown): AiSearchPrice {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()

    if (priceValueSet.has(normalized)) {
      return normalized as AiSearchPrice
    }

    if (
      normalized.includes("cheap") ||
      normalized.includes("budget") ||
      normalized.includes("affordable")
    ) {
      return "under-500k"
    }

    if (
      normalized.includes("luxury") ||
      normalized.includes("premium") ||
      normalized.includes("high-end")
    ) {
      return "over-2m"
    }

    const parsedBudget = parseBudgetValue(normalized)

    if (parsedBudget) {
      return bucketPriceValue(parsedBudget)
    }
  }

  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return bucketPriceValue(value)
  }

  return "any"
}

function bucketBedroomValue(count: number): AiSearchBedrooms {
  if (count >= 4) {
    return "4plus"
  }

  if (count >= 3) {
    return "3plus"
  }

  if (count >= 2) {
    return "2plus"
  }

  if (count >= 1) {
    return "1plus"
  }

  return "any"
}

function normalizeBedroomsValue(value: unknown): AiSearchBedrooms {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase()

    if (bedroomValueSet.has(normalized)) {
      return normalized as AiSearchBedrooms
    }

    if (normalized.includes("studio")) {
      return "1plus"
    }

    const numericMatch = normalized.match(/\d+/)

    if (numericMatch) {
      return bucketBedroomValue(Number(numericMatch[0]))
    }
  }

  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return bucketBedroomValue(value)
  }

  return "any"
}

function normalizeAiSearchResponse(value: unknown): AiSearchResponse {
  const parsed =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : ({} as Record<string, unknown>)

  const rawLocation =
    typeof parsed.location === "string" ? parsed.location.trim() : ""
  const location =
    rawLocation && !/^(any|none|null|n\/a)$/i.test(rawLocation)
      ? rawLocation
      : ""
  const price = normalizePriceValue(parsed.price)
  const bedrooms = normalizeBedroomsValue(parsed.bedrooms)

  return {
    bedrooms,
    location,
    price,
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { prompt?: string }
    const prompt = body.prompt?.trim()

    if (!prompt) {
      return NextResponse.json(
        { error: "Please provide a natural-language search request." },
        { status: 400 }
      )
    }

    const groq = getGroqClient()
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            `You convert natural-language real-estate requests into EstatePro explore filters.
Return only a valid JSON object with exactly these keys:
{
  "location": string,
  "price": "any" | "under-500k" | "500k-1m" | "1m-2m" | "over-2m",
  "bedrooms": "any" | "1plus" | "2plus" | "3plus" | "4plus"
}
Rules:
- Use an empty string for location when none is given.
- Use "any" when price or bedrooms are not specified.
- Map vague cheap/budget language to "under-500k".
- Map premium/luxury language to "over-2m".
- Never include extra keys, prose, or markdown.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: "The AI search response was empty." },
        { status: 502 }
      )
    }

    let parsedContent: unknown

    try {
      parsedContent = JSON.parse(content)
    } catch {
      return NextResponse.json(
        { error: "The AI search response could not be parsed." },
        { status: 502 }
      )
    }

    return NextResponse.json({
      filters: normalizeAiSearchResponse(parsedContent),
    })
  } catch (error) {
    if (error instanceof Error && error.message === "GROQ_API_KEY is missing.") {
      return NextResponse.json(
        { error: "AI search is not configured yet. Add GROQ_API_KEY to enable it." },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error:
          "We could not process that AI search right now. Please try again in a moment.",
      },
      { status: 500 }
    )
  }
}
