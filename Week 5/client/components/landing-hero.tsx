import Link from "next/link"
import { ArrowRight, Sparkles, Target, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Target,
    title: "Personalized Paths",
    description: "AI-driven career recommendations tailored to your unique skills and interests.",
  },
  {
    icon: BookOpen,
    title: "Learning Roadmaps",
    description: "Step-by-step plans with curated courses to reach your career goals faster.",
  },
  {
    icon: TrendingUp,
    title: "Confidence Scoring",
    description: "Transparent confidence scores so you can make informed career decisions.",
  },
]

export function LandingHero() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            G.U.I.D.E AI
          </span>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            Dashboard
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center lg:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground mb-8">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>AI-Powered Career Guidance</span>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Discover Your Ideal
          <span className="text-primary"> Career Path</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Goal-based Upskilling & Individual Direction Engine.
          Let AI analyze your skills and interests to map out
          a personalized career journey.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/profile">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Explore Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How G.U.I.D.E AI Works
          </h2>
          <p className="mt-3 text-center text-muted-foreground">
            Three simple steps to unlock your career potential.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground lg:px-10">
        <p>G.U.I.D.E AI - Goal-based Upskilling & Individual Direction Engine</p>
      </footer>
    </div>
  )
}
