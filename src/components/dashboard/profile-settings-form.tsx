"use client"

import { useActionState } from "react"

import {
  type ProfileFormState,
  updateProfile,
} from "@/app/dashboard/profile/actions"
import { DashboardSubmitButton } from "@/components/dashboard/dashboard-submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const initialState: ProfileFormState = {
  status: "idle",
}

type ProfileSettingsFormProps = {
  bio?: string | null
  name?: string | null
  phone?: string | null
}

export function ProfileSettingsForm({
  bio,
  name,
  phone,
}: ProfileSettingsFormProps) {
  const [state, formAction] = useActionState(updateProfile, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="profile-name">Full Name</Label>
        <Input
          id="profile-name"
          name="name"
          defaultValue={name ?? ""}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-phone">Phone</Label>
        <Input
          id="profile-phone"
          name="phone"
          defaultValue={phone ?? ""}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-bio">Bio</Label>
        <Textarea
          id="profile-bio"
          name="bio"
          defaultValue={bio ?? ""}
          maxLength={280}
          placeholder="Share a short note about your buying goals, investment focus, or preferred areas."
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "text-sm leading-7",
          state.status === "success"
            ? "text-primary"
            : state.status === "error"
              ? "text-destructive"
              : "text-muted-foreground"
        )}
      >
        {state.message ??
          "Update your saved account details, including the phone number and short bio shown across the dashboard."}
      </p>

      <DashboardSubmitButton
        idleLabel="Save profile"
        pendingLabel="Saving profile"
      />
    </form>
  )
}
