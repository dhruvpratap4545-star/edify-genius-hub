import { createFileRoute, Link } from "@tanstack/react-router";
import { History as HistoryIcon, BookOpen, Bot, Trash2, CheckCircle2 } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatWhen, useHistory } from "@/lib/store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Learning History — Dhruv Academy" },
      {
        name: "description",
        content:
          "Review every quiz attempt, completed lesson and tutor session you have logged in Dhruv Academy.",
      },
      { property: "og:title", content: "Learning History — Dhruv Academy" },
      {
        property: "og:description",
        content: "Your recent quizzes, lessons and tutor sessions in one timeline.",
      },
    ],
  }),
  component: HistoryPage,
});

const kindIcon = {
  quiz: CheckCircle2,
  lesson: BookOpen,
  tutor: Bot,
} as const;

function HistoryPage() {
  const { history, clear, hydrated } = useHistory();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Learning history</h1>
            <p className="mt-2 text-muted-foreground">
              Saved on this device — nothing leaves your browser.
            </p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" onClick={clear}>
              <Trash2 className="mr-2 size-4" /> Clear
            </Button>
          )}
        </div>

        {!hydrated ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : history.length === 0 ? (
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HistoryIcon className="size-5" /> Nothing here yet
              </CardTitle>
              <CardDescription>
                Finish a lesson or take a quiz and it will show up in this timeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/quiz">Take a quiz</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/lessons">Browse lessons</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-8 space-y-3">
            {history.map((entry) => {
              const Icon = kindIcon[entry.kind];
              return (
                <li
                  key={entry.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-4"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{entry.title}</p>
                    <p className="text-sm text-muted-foreground">{entry.detail}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant="secondary" className="capitalize">
                      {entry.kind}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatWhen(entry.at)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SiteLayout>
  );
}
