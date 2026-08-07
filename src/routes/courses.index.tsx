import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, Users, Clock } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courses } from "@/lib/demo-data";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Course Catalog — AiEdTech" },
      {
        name: "description",
        content:
          "Browse AiEdTech courses in AI, mathematics, programming, physics and study skills, with lessons and progress.",
      },
      { property: "og:title", content: "Course Catalog — AiEdTech" },
      {
        property: "og:description",
        content: "Adaptive courses across AI, maths, programming, physics and study skills.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");

  const subjects = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.subject)))],
    [],
  );

  const filtered = courses.filter((course) => {
    const matchesSubject = subject === "All" || course.subject === subject;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.summary.toLowerCase().includes(q) ||
      course.instructor.toLowerCase().includes(q);
    return matchesSubject && matchesQuery;
  });

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight">Course catalog</h1>
        <p className="mt-2 text-muted-foreground">
          {courses.length} courses · adaptive lesson paths · AI tutor support on every topic
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses or instructors…"
            className="md:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={s === subject ? "default" : "outline"}
                onClick={() => setSubject(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card key={course.slug} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{course.subject}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="mt-3 text-lg leading-snug">{course.title}</CardTitle>
                <CardDescription>{course.summary}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3.5 text-accent" /> {course.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5" /> {course.learners.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {course.hours}h
                  </span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>{course.instructor}</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/courses/$slug" params={{ slug: course.slug }}>
                    {course.progress > 0 ? "Continue" : "Start course"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No courses match that search. Try another subject.
          </p>
        )}
      </div>
    </SiteLayout>
  );
}
