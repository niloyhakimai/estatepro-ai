import { existsSync } from "node:fs"

import { defineConfig } from "prisma/config"

if (existsSync(".env")) {
  process.loadEnvFile?.()
}

if (existsSync(".env.local")) {
  process.loadEnvFile?.(".env.local")
}

const connectionUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL

export default defineConfig({
  schema: "prisma/schema.prisma",
  ...(connectionUrl
    ? {
        datasource: {
          url: connectionUrl,
        },
      }
    : {}),
})
