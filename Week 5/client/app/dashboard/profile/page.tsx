import { ProfileForm } from "@/components/profile-form"

export default function ProfilePage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Build Your Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Complete your profile to receive personalized career guidance.
        </p>
      </div>
      <ProfileForm />
    </div>
  )
}
