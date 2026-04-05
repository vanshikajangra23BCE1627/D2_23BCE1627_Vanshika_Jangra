"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  User,
  Compass,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const quickLinks = [
  {
    href: "/dashboard/profile",
    label: "Build Profile",
    description: "Enter your skills and interests",
    icon: User,
  },
  {
    href: "/dashboard/recommendations",
    label: "View Recommendations",
    description: "See your career path matches",
    icon: Compass,
  },
  {
    href: "/dashboard/history",
    label: "View History",
    description: "Review past submissions",
    icon: Clock,
  },
]

const stats = [
  { label: "Career Paths", value: "50+", icon: Target },
  { label: "Courses Mapped", value: "200+", icon: BookOpen },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
]

export function DashboardHome() {
  const [hasProfile, setHasProfile] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    const stored = sessionStorage.getItem("guideai-profile")
    if (stored) {
      const profile = JSON.parse(stored)
      setHasProfile(true)
      setName(profile.name)
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {hasProfile ? `Welcome back, ${name}` : "Welcome to G.U.I.D.E AI"}
          </h1>
        </div>
        <p className="text-muted-foreground">
          {hasProfile
            ? "Continue exploring your career recommendations or update your profile."
            : "Get started by building your profile to receive personalized career guidance."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 cursor-pointer">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground mb-2">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{link.label}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    Go
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started CTA */}
      {!hasProfile && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Ready to discover your ideal career?
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Fill in your skills, interests, and academic background. Our AI will analyze your profile and suggest the best career paths with actionable roadmaps.
            </p>
            <Link href="/dashboard/profile">
              <Button size="lg" className="gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
