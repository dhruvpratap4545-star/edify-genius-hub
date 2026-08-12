import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Bot, LineChart, Sparkles, Zap } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizEngine } from "@/components/QuizEngine";
import { courses } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhruv Academy — Your Personal AI Guide for Learning" },
      {
        name: "description",
        content:
          "Adaptive courses, a Socratic AI tutor, daily quizzes and progress analytics — all in one friendly learning space.",
      },
      { property: "og:title", content: "Dhruv Academy — Your Personal AI Guide for Learning" },
      {
        property: "og:description",
        content: "Adaptive courses, a Socratic AI tutor, daily quizzes and progress analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Bot,
    title: "Dhruv AI tutor",
    body: "A Socratic study partner that guides you to the answer on a holographic board.",
    to: "/tutor" as const,
  },
  {
    icon: BookOpen,
    title: "Courses & lessons",
    body: "Structured tracks with lesson-by-lesson progress saved on your device.",
    to: "/courses" as const,
  },
  {
    icon: LineChart,
    title: "Progress dashboard",
    body: "Streaks, weekly minutes, XP and per-course completion at a glance.",
    to: "/dashboard" as const,
  },
];

function Index() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 text-center">
        <Badge variant="outline" className="border-primary/50 px-4 py-1 text-sm">
          <Sparkles className="mr-2 inline size-4" />
          Dhruv Academy AI v2.0 — demo mode
        </Badge>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Dhruv Academy — <span className="text-primary">Your Personal AI Guide for Learning</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Learn with an interactive AI tutor, practise with daily quizzes, and watch your progress
          grow — in English, Hindi or Hinglish.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/tutor">Ask Dhruv AI</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/dashboard">View dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <f.icon className="size-5 text-primary" /> {f.title}
              </CardTitle>
              <CardDescription>{f.body}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="px-0">
                <Link to={f.to}>Open →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Daily quiz</h2>
            <p className="text-sm text-muted-foreground">
              A quick warm-up. Full practice sets live on the Quiz page.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/quiz">Full practice quiz</Link>
          </Button>
        </div>
        <QuizEngine />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Popular courses</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <Card key={course.slug}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  {course.level}
                </Badge>
                <CardTitle className="mt-2 text-base leading-snug">{course.title}</CardTitle>
                <CardDescription>{course.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link to="/courses/$slug" params={{ slug: course.slug }}>
                    View course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
