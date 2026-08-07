import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, PlayCircle, FileText, Dumbbell, Star, Users, Clock } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourse, type Lesson } from "@/lib/demo-data";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — AiEdTech" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.title} — AiEdTech` },
        { name: "description", content: course.summary },
        { property: "og:title", content: `${course.title} — AiEdTech` },
        { property: "og:description", content: course.summary },
      ],
    };
  },
  component: CourseDetail,
});

const lessonIcon = {
  video: PlayCircle,
  reading: FileText,
  practice: Dumbbell,
} as const;

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons);

  const done = lessons.filter((l) => l.completed).length;
  const progress = Math.round((done / lessons.length) * 100);

  const toggle = (id: string) =>
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l)),
    );

  return (
    <SiteLayout>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{course.subject}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{course.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span>Taught by {course.instructor}</span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 text-accent" /> {course.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-4" /> {course.learners.toLocaleString()} learners
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" /> {course.hours} hours
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold">Lessons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tick a lesson to update your progress — {done} of {lessons.length} complete.
          </p>
          <div className="mt-6 space-y-3">
            {lessons.map((lesson, i) => {
              const Icon = lessonIcon[lesson.type];
              return (
                <button
                  key={lesson.id}
                  onClick={() => toggle(lesson.id)}
                  className="flex w-full items-center gap-4 rounded-lg border border-border p-4 text-left transition-colors hover:bg-secondary/60"
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  ) : (
                    <Circle className="size-5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {i + 1}. {lesson.title}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="size-3.5" />
                      {lesson.type} · {lesson.minutes} min
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your progress</CardTitle>
              <CardDescription>{progress}% of this course complete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <Button asChild className="w-full">
                <Link to="/tutor">Ask the AI tutor about this</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/quiz">Practice quiz</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What you'll be able to do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {course.outcomes.map((outcome: string) => (
                  <li key={outcome} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </SiteLayout>
  );
}
