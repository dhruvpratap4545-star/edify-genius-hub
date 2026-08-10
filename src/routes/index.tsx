import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Bot, LineChart, BookOpen, Zap, ShieldCheck } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, learner } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhruv Academy — Your Personal AI Guide for Learning" },
      {
        name: "description",
        content:
          "Adaptive courses, a Socratic AI tutor and progress analytics. Explore the full Dhruv Academy demo instantly.",
      },
      { property: "og:title", content: "Dhruv Academy — Your Personal AI Guide for Learning" },
      {
        property: "og:description",
        content: "Adaptive courses, an AI tutor and progress analytics in one learning workspace.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Bot,
    title: "Socratic AI tutor",
    body: "Ask anything and get guided questions that build understanding instead of handing over answers.",
  },
  {
    icon: Sparkles,
    title: "Adaptive lesson paths",
    body: "Each course reorders itself around what you've mastered and what keeps slipping.",
  },
  {
    icon: LineChart,
    title: "Progress analytics",
    body: "Streaks, weekly minutes and mastery per topic — visible at a glance on your dashboard.",
  },
  {
    icon: BookOpen,
    title: "Generated quizzes",
    body: "Retrieval practice drawn from the exact lessons you studied this week.",
  },
  {
    icon: Zap,
    title: "Ten-minute sessions",
    body: "Study blocks designed around spacing and interleaving, not marathon cramming.",
  },
  {
    icon: ShieldCheck,
    title: "Verifiable explanations",
    body: "Every AI answer points back to the lesson it came from, so you can check the source.",
  },
];

function Index() {
  const featured = courses.slice(0, 3);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent">
              Demo mode — everything is live
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Dhruv Academy — Your Personal AI Guide for Learning
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Dhruv Academy combines adaptive courses, Dhruv AI as your Socratic tutor and honest progress analytics
              into one workspace built on the science of how memory actually works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/courses">Browse courses</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tutor">Try the AI tutor</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                ["108k", "Learners"],
                ["4.8★", "Avg rating"],
                [`${learner.streak} days`, "Your streak"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-semibold text-foreground">{value}</dt>
                  <dd className="text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Today's session</CardTitle>
              <CardDescription>Picked for you from three active courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {featured.map((course) => (
                <Link
                  key={course.slug}
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="block rounded-lg border border-border p-4 transition-colors hover:bg-secondary/60"
                >
                  <p className="text-sm font-medium text-foreground">{course.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {course.progress}% complete · {course.lessons.length} lessons
                  </p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Everything in one workspace</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          No separate flashcard app, no scattered notes, no guessing whether the studying worked.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-6 text-primary" />
                <CardTitle className="mt-3 text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ready to test yourself?</h2>
            <p className="mt-2 text-muted-foreground">
              Five questions pulled from your active lessons. Two minutes, instant feedback.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/quiz">Start the quiz</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
