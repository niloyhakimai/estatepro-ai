import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim() ?? ""

  if (query.length < 2) {
    return Response.json({ suggestions: [] as string[] })
  }

  const normalizedQuery = query.toLowerCase()

  const properties = await prisma.property.findMany({
    where: {
      isAvailable: true,
      OR: [
        {
          location: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      location: true,
      title: true,
    },
    take: 10,
  })

  const suggestions: string[] = []
  const seen = new Set<string>()

  for (const property of properties) {
    const matches = [property.location, property.title].filter((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )

    for (const match of matches) {
      const normalizedMatch = match.toLowerCase()

      if (seen.has(normalizedMatch)) {
        continue
      }

      seen.add(normalizedMatch)
      suggestions.push(match)

      if (suggestions.length === 5) {
        return Response.json({ suggestions })
      }
    }
  }

  return Response.json({ suggestions })
}
