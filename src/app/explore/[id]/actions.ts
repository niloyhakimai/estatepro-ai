"use server"

import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/app/api/auth/[...nextauth]/auth-options"

export type InquiryFormState = {
  message?: string
  status: "error" | "idle" | "success"
}

export async function createInquiry(
  propertyId: string,
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const session = await getAuthSession()

  if (!session?.user?.id) {
    return {
      status: "error",
      message: "Please sign in before sending an inquiry.",
    }
  }

  const message = String(formData.get("message") ?? "").trim()

  if (!message) {
    return {
      status: "error",
      message: "Please add a short message before submitting your inquiry.",
    }
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { id: true, title: true },
  })

  if (!property) {
    return {
      status: "error",
      message: "This property is no longer available for inquiries.",
    }
  }

  await prisma.inquiry.create({
    data: {
      message,
      propertyId,
      userId: session.user.id,
    },
  })

  return {
    status: "success",
    message: `Inquiry sent for ${property.title}. The team will follow up shortly.`,
  }
}
