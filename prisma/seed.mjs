import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient, Role } from "@prisma/client"
import { hash } from "bcryptjs"

process.loadEnvFile?.()

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.")
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
  log: ["error"],
})

const seedAdmin = {
  email: "seed-admin@estatepro.local",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  name: "EstatePro Seed Admin",
  password: "SeedAdmin123!",
}

const seedProperties = [
  {
    title: "South Austin Garden Townhome",
    description:
      "A bright three-bedroom townhome with an open-concept living area, private fenced patio, and quick access to local coffee shops, trails, and downtown Austin employers.",
    price: 385000,
    location: "Austin",
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1680,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "West Lake Hills Modern Retreat",
    description:
      "A luxury Austin residence with four bedrooms, dramatic hill-country views, a designer kitchen, and seamless indoor-outdoor entertaining around the pool terrace.",
    price: 2750000,
    location: "Austin",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3925,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Upper West Side Parkview Condo",
    description:
      "A refined two-bedroom New York condo with oversized windows, updated finishes, concierge access, and a layout designed for both city living and remote work.",
    price: 875000,
    location: "New York",
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1120,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Ballard Craftsman Residence",
    description:
      "A well-kept Seattle craftsman offering three bedrooms, a flexible bonus room, landscaped outdoor space, and strong commuter access to South Lake Union and downtown.",
    price: 760000,
    location: "Seattle",
    bedrooms: 3,
    bathrooms: 2,
    areaSqFt: 1890,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Coconut Grove Waterfront Escape",
    description:
      "A four-bedroom Miami home with resort-style outdoor living, a chef's kitchen, generous primary suite, and easy access to marinas, dining, and private schools.",
    price: 1650000,
    location: "Miami",
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: 2840,
    images: [
      "https://images.unsplash.com/photo-1600607687644-a741f1403c5a?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    title: "Tribeca Skyline Penthouse",
    description:
      "A premium New York penthouse featuring four bedrooms, private terrace entertaining, floor-to-ceiling city views, and curated finishes throughout a full-floor layout.",
    price: 3200000,
    location: "New York",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 3105,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&auto=format&fit=crop&q=80",
    ],
  },
]

async function main() {
  const passwordHash = await hash(seedAdmin.password, 12)

  const owner = await prisma.user.upsert({
    where: { email: seedAdmin.email },
    update: {
      image: seedAdmin.image,
      name: seedAdmin.name,
      password: passwordHash,
      role: Role.ADMIN,
    },
    create: {
      email: seedAdmin.email,
      image: seedAdmin.image,
      name: seedAdmin.name,
      password: passwordHash,
      role: Role.ADMIN,
    },
    select: {
      email: true,
      id: true,
      role: true,
    },
  })

  await prisma.$transaction(async (tx) => {
    await tx.property.deleteMany({
      where: { ownerId: owner.id },
    })

    for (const property of seedProperties) {
      await tx.property.create({
        data: {
          ...property,
          isAvailable: true,
          ownerId: owner.id,
        },
      })
    }
  })

  console.log("")
  console.log("EstatePro seed complete.")
  console.log(`Seed owner: ${owner.email} (${owner.role})`)
  console.log(`Seed password: ${seedAdmin.password}`)
  console.log(`Properties inserted: ${seedProperties.length}`)
  console.log("Seeded listings:")

  for (const property of seedProperties) {
    console.log(`- ${property.location}: ${property.title}`)
  }
}

main()
  .catch((error) => {
    console.error("Seed failed.")
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
