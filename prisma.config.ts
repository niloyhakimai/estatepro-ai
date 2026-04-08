import { defineConfig } from "prisma/config"

process.loadEnvFile?.()

const connectionUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL

if (!connectionUrl) {
  throw new Error(
    "Set DATABASE_URL or DIRECT_URL before running Prisma CLI commands."
  )
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: connectionUrl,
  },
})
