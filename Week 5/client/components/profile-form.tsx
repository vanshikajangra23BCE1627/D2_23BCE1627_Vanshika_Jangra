"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

const SKILL_OPTIONS = [
  "Python", "JavaScript", "Java", "C++", "React",
  "Machine Learning", "Data Analysis", "SQL", "HTML/CSS",
  "Node.js", "TypeScript", "AWS", "Docker", "Git",
  "Communication", "Leadership", "Problem Solving",
  "Public Speaking", "Project Management",
]

const INTEREST_OPTIONS = [
  "Web Development", "Mobile Development", "Data Science",
  "Artificial Intelligence", "Cloud Computing", "Cybersecurity",
  "UI/UX Design", "Game Development", "DevOps",
  "Blockchain", "IoT", "Robotics", "Research",
]

function TagInput({
  label,
  description,
  options,
  selected,
  onSelect,
  onRemove,
}: {
  label: string
  description: string
  options: string[]
  selected: string[]
  onSelect: (val: string) => void
  onRemove: (val: string) => void
}) {
  const [inputValue, setInputValue] = useState("")
  const filtered = options.filter(
    (o) =>
      !selected.includes(o) &&
      o.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="relative">
        <Input
          placeholder={`Search or type to add ${label.toLowerCase()}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              e.preventDefault()
              if (!selected.includes(inputValue.trim())) {
                onSelect(inputValue.trim())
              }
              setInputValue("")
            }
          }}
        />
        {inputValue && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
            {filtered.slice(0, 6).map((option) => (
              <button
                key={option}
                type="button"
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                onClick={() => {
                  onSelect(option)
                  setInputValue("")
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selected.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="ml-1 rounded-full p-0.5 hover:bg-foreground/10 transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

export function ProfileForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [marks, setMarks] = useState("")
  const [studyTime, setStudyTime] = useState([10])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const profile = {
      name,
      skills,
      interests,
      marks: parseFloat(marks),
      studyTime: studyTime[0],
      submittedAt: new Date().toISOString(),
    }
    // Store in sessionStorage for the recommendations page to read
    sessionStorage.setItem("guideai-profile", JSON.stringify(profile))
    // Also save to history
    const history = JSON.parse(sessionStorage.getItem("guideai-history") || "[]")
    history.unshift(profile)
    sessionStorage.setItem("guideai-history", JSON.stringify(history.slice(0, 10)))
    router.push("/dashboard/recommendations")
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself so we can recommend the best career paths for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Skills */}
          <TagInput
            label="Skills"
            description="Select or type your technical and soft skills."
            options={SKILL_OPTIONS}
            selected={skills}
            onSelect={(val) => setSkills((prev) => [...prev, val])}
            onRemove={(val) => setSkills((prev) => prev.filter((s) => s !== val))}
          />

          {/* Interests */}
          <TagInput
            label="Interests"
            description="What areas of technology excite you?"
            options={INTEREST_OPTIONS}
            selected={interests}
            onSelect={(val) => setInterests((prev) => [...prev, val])}
            onRemove={(val) => setInterests((prev) => prev.filter((s) => s !== val))}
          />

          {/* Academic Marks */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="marks">Academic Marks / GPA</Label>
            <div className="flex items-center gap-3">
              <Input
                id="marks"
                type="number"
                placeholder="e.g. 8.5"
                step="0.1"
                min="0"
                max="10"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
                className="max-w-[140px]"
              />
              <Select onValueChange={(val) => setMarks(val)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Quick select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9.5">Outstanding (9.5)</SelectItem>
                  <SelectItem value="8.5">Excellent (8.5)</SelectItem>
                  <SelectItem value="7.5">Very Good (7.5)</SelectItem>
                  <SelectItem value="6.5">Good (6.5)</SelectItem>
                  <SelectItem value="5.5">Average (5.5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Study Time */}
          <div className="flex flex-col gap-3">
            <Label>Available Study Time</Label>
            <p className="text-sm text-muted-foreground">
              How many hours per week can you dedicate to learning?
            </p>
            <div className="flex items-center gap-4">
              <Slider
                value={studyTime}
                onValueChange={setStudyTime}
                max={40}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="min-w-[80px] rounded-md bg-secondary px-3 py-1.5 text-center text-sm font-medium text-secondary-foreground">
                {studyTime[0]} hrs/wk
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full mt-2">
            Get Recommendations
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
