import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Target, Trophy, Timer } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, learner } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Learning Dashboard — Dhruv Academy" },
      {
        name: "description",
        content:
          "Track streaks, weekly study minutes, XP and per-course progress across your Dhruv Academy learning plan.",
      },
      { property: "og:title", content: "Learning Dashboard — Dhruv Academy" },
      {
        property: "og:description",
        content: "Streaks, weekly minutes, XP and course-by-course progress at a glance.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const goalPct = Math.min(
    100,
    Math.round((learner.minutesThisWeek / learner.weeklyGoal) * 100),
  );
  const peak = Math.max(...learner.activity.map((d) => d.minutes));
  const active = courses.filter((c) => c.progress > 0);

  const stats = [
    { icon: Flame, label: "Day streak", value: `${learner.streak}` },
    { icon: Timer, label: "Minutes this week", value: `${learner.minutesThisWeek}` },
    { icon: Trophy, label: "Total XP", value: learner.xp.toLocaleString() },
    { icon: Target, label: "Level", value: `${learner.level}` },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {learner.name}</h1>
            <p className="mt-2 text-muted-foreground">
              You're {learner.weeklyGoal - learner.minutesThisWeek} minutes from this week's goal.
            </p>
          </div>
          <Button asChild>
            <Link to="/tutor">Start a session</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 pt-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <stat.icon className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This week</CardTitle>
              <CardDescription>
                {learner.minutesThisWeek} of {learner.weeklyGoal} minutes · {goalPct}% of goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-44 items-end gap-3">
                {learner.activity.map((day) => (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-primary/85"
                      style={{ height: `${(day.minutes / peak) * 100}%` }}
                      title={`${day.minutes} min`}
                    />
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-accent" style={{ width: `${goalPct}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badges earned</CardTitle>
              <CardDescription>Milestones from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {learner.badges.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Active courses</h2>
        <div className="mt-5 space-y-3">
          {active.map((course) => (
            <Link
              key={course.slug}
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium">{course.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.subject} · {course.lessons.filter((l) => l.completed).length} of{" "}
                  {course.lessons.length} lessons done
                </p>
              </div>
              <div className="flex items-center gap-4 sm:w-64">
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {course.progress}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
