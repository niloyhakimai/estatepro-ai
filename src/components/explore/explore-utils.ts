import type { Prisma } from "@prisma/client"

export const priceOptions = [
  { label: "Any price", value: "any" },
  { label: "Under $500k", value: "under-500k" },
  { label: "$500k - $1M", value: "500k-1m" },
  { label: "$1M - $2M", value: "1m-2m" },
  { label: "$2M+", value: "over-2m" },
] as const

export const bedroomOptions = [
  { label: "Any bedrooms", value: "any" },
  { label: "1+ Beds", value: "1plus" },
  { label: "2+ Beds", value: "2plus" },
  { label: "3+ Beds", value: "3plus" },
  { label: "4+ Beds", value: "4plus" },
] as const

export const sortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const

export type PriceFilter = (typeof priceOptions)[number]["value"]
export type BedroomFilter = (typeof bedroomOptions)[number]["value"]
export type ExploreSort = (typeof sortOptions)[number]["value"]

export type ExploreFilters = {
  bedrooms: BedroomFilter
  location: string
  price: PriceFilter
  sort: ExploreSort
}

type RawSearchParams = Record<string, string | string[] | undefined>

const priceValues = new Set<PriceFilter>(priceOptions.map((option) => option.value))
const bedroomValues = new Set<BedroomFilter>(
  bedroomOptions.map((option) => option.value)
)
const sortValues = new Set<ExploreSort>(sortOptions.map((option) => option.value))

function getStringValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? ""
  }

  return value ?? ""
}

export function normalizeExploreFilters(searchParams: RawSearchParams): ExploreFilters {
  const location = getStringValue(searchParams.location).trim()
  const rawPrice = getStringValue(searchParams.price)
  const rawBedrooms = getStringValue(searchParams.bedrooms)
  const rawSort = getStringValue(searchParams.sort)

  return {
    location,
    price: priceValues.has(rawPrice as PriceFilter)
      ? (rawPrice as PriceFilter)
      : "any",
    bedrooms: bedroomValues.has(rawBedrooms as BedroomFilter)
      ? (rawBedrooms as BedroomFilter)
      : "any",
    sort: sortValues.has(rawSort as ExploreSort)
      ? (rawSort as ExploreSort)
      : "newest",
  }
}

export function buildPropertyWhereInput(filters: ExploreFilters): Prisma.PropertyWhereInput {
  const where: Prisma.PropertyWhereInput = {
    isAvailable: true,
  }

  if (filters.location) {
    where.location = {
      contains: filters.location,
      mode: "insensitive",
    }
  }

  if (filters.price !== "any") {
    where.price =
      filters.price === "under-500k"
        ? { lt: 500_000 }
        : filters.price === "500k-1m"
          ? { gte: 500_000, lt: 1_000_000 }
          : filters.price === "1m-2m"
            ? { gte: 1_000_000, lt: 2_000_000 }
            : { gte: 2_000_000 }
  }

  if (filters.bedrooms !== "any") {
    where.bedrooms = {
      gte:
        filters.bedrooms === "1plus"
          ? 1
          : filters.bedrooms === "2plus"
            ? 2
            : filters.bedrooms === "3plus"
              ? 3
              : 4,
    }
  }

  return where
}

export function buildPropertyOrderBy(
  sort: ExploreSort
): Prisma.PropertyOrderByWithRelationInput[] {
  if (sort === "price-asc") {
    return [{ price: "asc" }, { createdAt: "desc" }]
  }

  if (sort === "price-desc") {
    return [{ price: "desc" }, { createdAt: "desc" }]
  }

  return [{ createdAt: "desc" }]
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatArea(areaSqFt: number) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(areaSqFt)} sq ft`
}