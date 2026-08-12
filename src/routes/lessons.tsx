import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Circle, PlayCircle, PencilRuler } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/demo-data";
import { useHistory, useLessonProgress } from "@/lib/store";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "All Lessons — Dhruv Academy" },
      {
        name: "description",
        content:
          "Every Dhruv Academy lesson in one place. Tick lessons off as you finish them — progress is saved on your device.",
      },
      { property: "og:title", content: "All Lessons — Dhruv Academy" },
      {
        property: "og:description",
        content: "Browse and complete every lesson across all Dhruv Academy courses.",
      },
    ],
  }),
  component: LessonsPage,
});

const typeIcon = {
  video: PlayCircle,
  reading: BookOpen,
  practice: PencilRuler,
} as const;

function LessonsPage() {
  const { done, toggle, hydrated } = useLessonProgress();
  const { add } = useHistory();

  const all = courses.flatMap((c) => c.lessons.map((l) => ({ course: c, lesson: l })));
  const completed = all.filter(({ course, lesson }) => done.includes(`${course.slug}:${lesson.id}`));
  const pct = all.length ? Math.round((completed.length / all.length) * 100) : 0;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Lessons</h1>
        <p className="mt-2 text-muted-foreground">
          {all.length} lessons across {courses.length} courses. Your ticks are stored locally.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Overall completion</CardTitle>
            <CardDescription>
              {hydrated ? `${completed.length} of ${all.length} lessons complete` : "Loading…"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={pct} />
            <p className="mt-2 text-sm text-muted-foreground">{pct}%</p>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-8">
          {courses.map((course) => (
            <section key={course.slug}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold tracking-tight">{course.title}</h2>
                <Button asChild size="sm" variant="outline">
                  <Link to="/courses/$slug" params={{ slug: course.slug }}>
                    Course page
                  </Link>
                </Button>
              </div>
              <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
                {course.lessons.map((lesson) => {
                  const key = `${course.slug}:${lesson.id}`;
                  const isDone = done.includes(key);
                  const Icon = typeIcon[lesson.type];
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => {
                          toggle(key);
                          if (!isDone) {
                            add({
                              kind: "lesson",
                              title: lesson.title,
                              detail: `${course.title} · ${lesson.minutes} min`,
                            });
                          }
                        }}
                        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-secondary/60"
                      >
                        {isDone ? (
                          <CheckCircle2 className="size-5 shrink-0 text-primary" />
                        ) : (
                          <Circle className="size-5 shrink-0 text-muted-foreground" />
                        )}
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <span
                          className={`flex-1 text-sm ${isDone ? "text-muted-foreground line-through" : ""}`}
                        >
                          {lesson.title}
                        </span>
                        <Badge variant="secondary" className="shrink-0">
                          {lesson.minutes} min
                        </Badge>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
