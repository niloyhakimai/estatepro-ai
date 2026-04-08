export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
} as const

export type AppRole = (typeof ROLES)[keyof typeof ROLES]
