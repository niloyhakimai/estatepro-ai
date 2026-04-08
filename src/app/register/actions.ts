"use server"

import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"

import { prisma } from "@/lib/prisma"

export type RegisterFormState = {
  message?: string
  status: "error" | "idle" | "success"
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function registerUser(
  _prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (name.length < 2) {
    return {
      status: "error",
      message: "Please enter your full name to create an account.",
    }
  }

  if (!emailPattern.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    }
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Use at least 8 characters for your password.",
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (existingUser) {
    return {
      status: "error",
      message: "An account with that email already exists. Please sign in instead.",
    }
  }

  const passwordHash = await hash(password, 12)

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        status: "error",
        message: "An account with that email already exists. Please sign in instead.",
      }
    }

    return {
      status: "error",
      message: "We could not create your account right now. Please try again.",
    }
  }

  return {
    status: "success",
    message: "Account created successfully. You can sign in with your email and password now.",
  }
}
