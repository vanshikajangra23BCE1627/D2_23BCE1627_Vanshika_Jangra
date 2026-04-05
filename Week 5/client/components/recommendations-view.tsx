"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
  TrendingUp,
  BookOpen,
  Code2,
  Shield,
  Cloud,
  BarChart3,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Profile {
  name: string
  skills: string[]
  interests: string[]
  marks: number
  studyTime: number
}

interface CareerPath {
  title: string
  description: string
  confidence: number
  icon: React.ElementType
  roadmap: string[]
  courses: { name: string; provider: string; level: string }[]
  tags: string[]
}

function generateRecommendations(profile: Profile): CareerPath[] {
  const paths: CareerPath[] = []

  const hasML = profile.skills.some((s) =>
    ["Python", "Machine Learning", "Data Analysis"].includes(s)
  )
  const hasWeb = profile.skills.some((s) =>
    ["JavaScript", "React", "HTML/CSS", "Node.js", "TypeScript"].includes(s)
  )
  const hasSecurity = profile.interests.some((s) =>
    ["Cybersecurity"].includes(s)
  )
  const hasCloud = profile.skills.some((s) =>
    ["AWS", "Docker"].includes(s)
  ) || profile.interests.some((s) => ["Cloud Computing", "DevOps"].includes(s))
  const hasDesign = profile.interests.some((s) =>
    ["UI/UX Design"].includes(s)
  )
  const hasData = profile.interests.some((s) =>
    ["Data Science", "Artificial Intelligence"].includes(s)
  )

  if (hasML || hasData) {
    paths.push({
      title: "Machine Learning Engineer",
      description:
        "Build intelligent systems that learn from data. Your analytical skills and interest in AI make this a strong match.",
      confidence: Math.min(95, 70 + profile.marks * 2 + (hasML ? 10 : 0)),
      icon: BarChart3,
      roadmap: [
        "Master Python fundamentals and NumPy/Pandas",
        "Learn statistics and linear algebra",
        "Complete ML foundations with scikit-learn",
        "Study deep learning with TensorFlow/PyTorch",
        "Build portfolio projects with real datasets",
        "Specialize in NLP, Computer Vision, or MLOps",
      ],
      courses: [
        { name: "Machine Learning Specialization", provider: "Coursera", level: "Intermediate" },
        { name: "Deep Learning with PyTorch", provider: "fast.ai", level: "Advanced" },
        { name: "ML Engineering for Production", provider: "Coursera", level: "Advanced" },
      ],
      tags: ["Python", "TensorFlow", "Statistics", "Deep Learning"],
    })
  }

  if (hasWeb) {
    paths.push({
      title: "Full-Stack Developer",
      description:
        "Create modern web applications end-to-end. Your web technology skills position you perfectly for this path.",
      confidence: Math.min(95, 72 + profile.marks * 2 + (hasWeb ? 8 : 0)),
      icon: Code2,
      roadmap: [
        "Strengthen JavaScript/TypeScript fundamentals",
        "Master React and Next.js",
        "Learn server-side with Node.js and databases",
        "Study API design and system architecture",
        "Build and deploy full-stack applications",
        "Explore testing, CI/CD, and DevOps basics",
      ],
      courses: [
        { name: "Full-Stack Open", provider: "University of Helsinki", level: "Intermediate" },
        { name: "Next.js & React Complete Guide", provider: "Udemy", level: "Intermediate" },
        { name: "System Design for Developers", provider: "Educative", level: "Advanced" },
      ],
      tags: ["React", "Node.js", "TypeScript", "Next.js"],
    })
  }

  if (hasSecurity) {
    paths.push({
      title: "Cybersecurity Analyst",
      description:
        "Protect organizations from digital threats. Your interest in cybersecurity aligns well with this growing field.",
      confidence: Math.min(92, 65 + profile.marks * 2.5),
      icon: Shield,
      roadmap: [
        "Learn networking fundamentals (TCP/IP, DNS)",
        "Study operating system security (Linux/Windows)",
        "Get certified with CompTIA Security+",
        "Practice with CTF challenges and lab environments",
        "Learn SIEM tools and incident response",
        "Specialize in penetration testing or security engineering",
      ],
      courses: [
        { name: "Cybersecurity Fundamentals", provider: "edX", level: "Beginner" },
        { name: "CompTIA Security+ Prep", provider: "Coursera", level: "Intermediate" },
        { name: "Ethical Hacking", provider: "Udemy", level: "Advanced" },
      ],
      tags: ["Network Security", "Linux", "Cryptography", "SIEM"],
    })
  }

  if (hasCloud) {
    paths.push({
      title: "Cloud / DevOps Engineer",
      description:
        "Architect scalable cloud infrastructure. Your cloud and container skills are a great foundation.",
      confidence: Math.min(93, 68 + profile.marks * 2 + (hasCloud ? 10 : 0)),
      icon: Cloud,
      roadmap: [
        "Master Linux and shell scripting",
        "Learn AWS or GCP core services",
        "Study containerization with Docker & Kubernetes",
        "Implement CI/CD pipelines",
        "Learn Infrastructure as Code (Terraform)",
        "Get cloud certified (AWS SA / GCP ACE)",
      ],
      courses: [
        { name: "AWS Solutions Architect", provider: "A Cloud Guru", level: "Intermediate" },
        { name: "Docker & Kubernetes Complete Guide", provider: "Udemy", level: "Intermediate" },
        { name: "Terraform Up & Running", provider: "O'Reilly", level: "Advanced" },
      ],
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    })
  }

  if (hasDesign) {
    paths.push({
      title: "UX/UI Designer",
      description:
        "Design intuitive and beautiful digital experiences. Your interest in design can shape how people interact with technology.",
      confidence: Math.min(90, 64 + profile.marks * 2.5),
      icon: Palette,
      roadmap: [
        "Learn UX research methods and user psychology",
        "Master Figma and design systems",
        "Study visual design principles and typography",
        "Build a portfolio of case studies",
        "Learn front-end basics (HTML/CSS)",
        "Practice with real-world redesign challenges",
      ],
      courses: [
        { name: "Google UX Design Certificate", provider: "Coursera", level: "Beginner" },
        { name: "UI Design with Figma", provider: "Designlab", level: "Intermediate" },
        { name: "Interaction Design Specialization", provider: "Coursera", level: "Advanced" },
      ],
      tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    })
  }

  // Default fallback path
  if (paths.length === 0) {
    paths.push({
      title: "Software Developer",
      description:
        "Start your journey in software development. A versatile career with endless growth potential.",
      confidence: Math.min(88, 60 + profile.marks * 3),
      icon: Code2,
      roadmap: [
        "Choose a first language (Python or JavaScript recommended)",
        "Learn data structures and algorithms",
        "Build beginner projects (calculator, to-do app)",
        "Learn version control with Git",
        "Pick a specialization (web, mobile, or backend)",
        "Contribute to open source projects",
      ],
      courses: [
        { name: "CS50 Introduction to Computer Science", provider: "Harvard/edX", level: "Beginner" },
        { name: "The Odin Project", provider: "Open Source", level: "Beginner" },
        { name: "Algorithms Specialization", provider: "Coursera", level: "Intermediate" },
      ],
      tags: ["Programming", "Algorithms", "Git", "Problem Solving"],
    })
  }

  return paths.sort((a, b) => b.confidence - a.confidence)
}

function ConfidenceMeter({ value }: { value: number }) {
  const color =
    value >= 85
      ? "text-green-600"
      : value >= 70
        ? "text-primary"
        : "text-amber-500"

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Confidence</span>
        <span className={`text-sm font-semibold ${color}`}>{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

function CareerCard({ path }: { path: CareerPath }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = path.icon

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <CardDescription className="mt-1">{path.description}</CardDescription>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {path.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4">
          <ConfidenceMeter value={path.confidence} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Roadmap */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Learning Roadmap</h4>
          </div>
          <div className="flex flex-col gap-2">
            {path.roadmap.slice(0, expanded ? undefined : 3).map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {i < 2 ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                )}
                <span className="text-sm text-foreground/80">{step}</span>
              </div>
            ))}
            {path.roadmap.length > 3 && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-1 text-sm font-medium text-primary hover:underline text-left"
              >
                {expanded ? "Show less" : `Show ${path.roadmap.length - 3} more steps`}
              </button>
            )}
          </div>
        </div>

        {/* Courses */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Suggested Courses</h4>
          </div>
          <div className="flex flex-col gap-2">
            {path.courses.map((course, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{course.name}</span>
                  <span className="text-xs text-muted-foreground">{course.provider}</span>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">
                  {course.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecommendationsView() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [paths, setPaths] = useState<CareerPath[]>([])

  useEffect(() => {
    const stored = sessionStorage.getItem("guideai-profile")
    if (stored) {
      const parsed = JSON.parse(stored) as Profile
      setProfile(parsed)
      setPaths(generateRecommendations(parsed))
    }
  }, [])

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">No Profile Yet</h2>
        <p className="max-w-sm text-muted-foreground">
          Complete your profile first to receive personalized career recommendations.
        </p>
        <Link href="/dashboard/profile">
          <Button className="gap-2">
            Build Profile
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Your Career Recommendations
        </h1>
        <p className="text-muted-foreground">
          Based on your profile, here are the best career paths for you, {profile.name}.
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Skills</p>
              <p className="text-sm font-medium text-foreground">{profile.skills.length} listed</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Interests</p>
              <p className="text-sm font-medium text-foreground">{profile.interests.length} areas</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Academic Score</p>
              <p className="text-sm font-medium text-foreground">{profile.marks}/10</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Study Time</p>
              <p className="text-sm font-medium text-foreground">{profile.studyTime} hrs/week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Path Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {paths.map((path) => (
          <CareerCard key={path.title} path={path} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link href="/dashboard/profile">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Update Profile for New Recommendations
          </Button>
        </Link>
      </div>
    </div>
  )
}
