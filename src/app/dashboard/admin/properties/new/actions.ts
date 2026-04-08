"use server"

import { revalidatePath } from "next/cache"

import { requireManagerOrAdminSession } from "@/components/dashboard/dashboard-auth"
import { prisma } from "@/lib/prisma"

export type NewPropertyFormState = {
  message?: string
  status: "error" | "idle" | "success"
}

function parsePositiveNumber(value: FormDataEntryValue | null, label: string) {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} must be greater than zero.`)
  }

  return parsed
}

function parsePositiveInteger(value: FormDataEntryValue | null, label: string) {
  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a whole number greater than zero.`)
  }

  return parsed
}

export async function createProperty(
  _prevState: NewPropertyFormState,
  formData: FormData
): Promise<NewPropertyFormState> {
  const session = await requireManagerOrAdminSession("/dashboard/admin/properties/new")

  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const location = String(formData.get("location") ?? "").trim()
  const rawImageUrls = String(formData.get("imageUrls") ?? "").trim()

  if (!title || !description || !location) {
    return {
      status: "error",
      message: "Title, description, and location are required.",
    }
  }

  try {
    const imageUrls = rawImageUrls
      .split(/\r?\n|,/)
      .map((url) => url.trim())
      .filter(Boolean)

    for (const imageUrl of imageUrls) {
      new URL(imageUrl)
    }

    await prisma.property.create({
      data: {
        areaSqFt: parsePositiveNumber(formData.get("areaSqFt"), "Area"),
        bathrooms: parsePositiveInteger(formData.get("bathrooms"), "Bathrooms"),
        bedrooms: parsePositiveInteger(formData.get("bedrooms"), "Bedrooms"),
        description,
        images: imageUrls,
        location,
        ownerId: session.user.id,
        price: parsePositiveNumber(formData.get("price"), "Price"),
        title,
      },
    })
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "We could not create the property. Please review the form and try again.",
    }
  }

  revalidatePath("/explore")
  revalidatePath("/dashboard/admin")
  revalidatePath("/dashboard/manager")
  revalidatePath("/dashboard/admin/properties")
  revalidatePath("/dashboard/admin/properties/new")

  return {
    status: "success",
    message: "Property created successfully and published to the listings feed.",
  }
}
