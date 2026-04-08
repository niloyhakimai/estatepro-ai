"use server"

import { revalidatePath } from "next/cache"

import { requireDashboardSession } from "@/components/dashboard/dashboard-auth"
import { prisma } from "@/lib/prisma"

export type ProfileFormState = {
  message?: string
  status: "error" | "idle" | "success"
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const session = await requireDashboardSession("/dashboard/profile")
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const bio = String(formData.get("bio") ?? "").trim()

  if (!name) {
    return {
      status: "error",
      message: "Please enter your name before saving your profile.",
    }
  }

  if (phone && phone.length < 7) {
    return {
      status: "error",
      message: "Please provide a valid phone number or leave it empty.",
    }
  }

  if (bio.length > 280) {
    return {
      status: "error",
      message: "Please keep the bio under 280 characters.",
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: bio || null,
      name,
      phone: phone || null,
    },
  })

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/profile")
  revalidatePath("/dashboard/user")
  revalidatePath("/dashboard/manager")
  revalidatePath("/dashboard/admin")
  revalidatePath("/dashboard/admin/users")

  return {
    status: "success",
    message: "Profile updated successfully. Your name, phone, and bio are now saved to the database.",
  }
}
