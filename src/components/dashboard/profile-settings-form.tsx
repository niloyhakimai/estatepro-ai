"use client"

import { useActionState } from "react"

import {
  type ProfileFormState,
  updateProfile,
} from "@/app/dashboard/profile/actions"
import { DashboardSubmitButton } from "@/components/dashboard/dashboard-submit-button"
import { Input } from "@/components/ui/input"
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
    <form action={formAction} className="space-y-6">
      <div className="space-y-2.5">
        <label
          htmlFor="profile-name"
          className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
        >
          Full Name
        </label>
        <Input
          id="profile-name"
          name="name"
          defaultValue={name ?? ""}
          placeholder="Your full name"
          required
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label
          htmlFor="profile-phone"
          className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
        >
          Phone
        </label>
        <Input
          id="profile-phone"
          name="phone"
          defaultValue={phone ?? ""}
          placeholder="+1 (555) 123-4567"
          className="h-12 rounded-[1.15rem] border-black/10 bg-white/50 px-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <div className="space-y-2.5">
        <label
          htmlFor="profile-bio"
          className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/60"
        >
          Bio
        </label>
        <Textarea
          id="profile-bio"
          name="bio"
          defaultValue={bio ?? ""}
          maxLength={280}
          placeholder="Share a short note about your buying goals, investment focus, or preferred areas."
          className="min-h-[120px] resize-none rounded-[1.15rem] border-black/10 bg-white/50 p-4 text-slate-900 placeholder:text-slate-400 shadow-inner transition-all focus-visible:border-black/20 focus-visible:bg-white focus-visible:ring-black/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 dark:focus-visible:bg-black/40 dark:focus-visible:ring-white/10"
        />
      </div>

      <p
        aria-live="polite"
        className={cn(
          "px-1 text-[0.8rem] font-medium leading-relaxed transition-colors",
          state.status === "success"
            ? "text-emerald-600 dark:text-emerald-400"
            : state.status === "error"
              ? "text-red-500"
              : "text-slate-500 dark:text-white/50"
        )}
      >
        {state.message ??
          "Update your saved account details, including the phone number and short bio shown across the dashboard."}
      </p>

      <DashboardSubmitButton
        idleLabel="Save profile"
        pendingLabel="Saving profile"
        className="h-12 w-full rounded-[1.15rem] bg-slate-900 px-8 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-[#b8f579] dark:text-black dark:shadow-[0_14px_34px_-20px_rgba(184,245,121,0.95)] dark:hover:bg-[#a6e55d]"
      />
    </form>
  )
}