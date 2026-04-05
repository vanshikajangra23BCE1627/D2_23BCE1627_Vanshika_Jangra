"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, ArrowRight, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface HistoryEntry {
  name: string
  skills: string[]
  interests: string[]
  marks: number
  studyTime: number
  submittedAt: string
}

export function HistoryView() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const stored = sessionStorage.getItem("guideai-history")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  const clearHistory = () => {
    sessionStorage.removeItem("guideai-history")
    setEntries([])
  }

  const loadProfile = (entry: HistoryEntry) => {
    sessionStorage.setItem("guideai-profile", JSON.stringify(entry))
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Clock className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">No History Yet</h2>
        <p className="max-w-sm text-muted-foreground">
          Your profile submissions will appear here so you can revisit past recommendations.
        </p>
        <Link href="/dashboard/profile">
          <Button className="gap-2">
            Create Profile
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">History</h1>
          <p className="mt-1 text-muted-foreground">
            Your past profile submissions and recommendation requests.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={clearHistory}>
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {entries.map((entry, i) => (
          <Card key={i} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{entry.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(entry.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </CardDescription>
                  </div>
                </div>
                <Link href="/dashboard/recommendations" onClick={() => loadProfile(entry)}>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
                    View Results
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.skills.slice(0, 3).map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                    {entry.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{entry.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {entry.interests.slice(0, 2).map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                    {entry.interests.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{entry.interests.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Score</p>
                  <p className="text-sm font-medium text-foreground">{entry.marks}/10</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Study Time</p>
                  <p className="text-sm font-medium text-foreground">{entry.studyTime} hrs/wk</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
