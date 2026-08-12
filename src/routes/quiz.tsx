import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quizQuestions, getCourse } from "@/lib/demo-data";
import { useHistory, useSettings } from "@/lib/store";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Practice Quiz — Dhruv Academy" },
      {
        name: "description",
        content:
          "Five retrieval-practice questions pulled from your active Dhruv Academy lessons, with instant explanations.",
      },
      { property: "og:title", content: "Practice Quiz — Dhruv Academy" },
      {
        property: "og:description",
        content: "Retrieval practice with instant feedback across your active courses.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const { add } = useHistory();
  const [settings] = useSettings();

  const question = quizQuestions[index]!;
  const course = getCourse(question.courseSlug);
  const answered = selected !== null;
  const correct = selected === question.answerIndex;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === question.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= quizQuestions.length) {
      setFinished(true);
      add({
        kind: "quiz",
        title: "Practice quiz completed",
        detail: `Scored ${score} / ${quizQuestions.length}`,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight">Practice quiz</h1>
        <p className="mt-2 text-muted-foreground">
          Retrieval practice beats re-reading. Answer, read the explanation, move on.
        </p>

        {finished ? (
          <Card className="mt-10">
            <CardHeader>
              <CardTitle>
                You scored {score} / {quizQuestions.length}
              </CardTitle>
              <CardDescription>
                {score === quizQuestions.length
                  ? "Flawless. Space this material again in three days to lock it in."
                  : score >= quizQuestions.length / 2
                    ? "Solid. Revisit the ones you missed tomorrow, then again in a week."
                    : "Worth a rewatch — pick the weakest topic and work through it with the tutor."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={restart}>
                <RotateCcw className="mr-2 size-4" /> Try again
              </Button>
              <Button asChild variant="outline">
                <Link to="/tutor">Review with the AI tutor</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course?.title ?? "General"}</Badge>
                <span className="text-sm text-muted-foreground">
                  Question {index + 1} of {quizQuestions.length}
                </span>
              </div>
              <CardTitle className="mt-4 text-xl leading-snug">{question.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, i) => {
                const isAnswer = i === question.answerIndex;
                const state = !answered
                  ? "border-border hover:bg-secondary/60"
                  : isAnswer
                    ? "border-primary bg-primary/10"
                    : i === selected
                      ? "border-destructive bg-destructive/10"
                      : "border-border opacity-60";
                return (
                  <button
                    key={option}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors ${state}`}
                  >
                    {answered && isAnswer && <CheckCircle2 className="size-4 text-primary" />}
                    {answered && !isAnswer && i === selected && (
                      <XCircle className="size-4 text-destructive" />
                    )}
                    <span>{option}</span>
                  </button>
                );
              })}

              {answered && settings.showExplanations && (
                <div className="rounded-lg bg-secondary p-4 text-sm text-secondary-foreground">
                  <p className="font-medium">{correct ? "Correct." : "Not quite."}</p>
                  <p className="mt-1 text-muted-foreground">{question.explanation}</p>
                </div>
              )}

              <Button className="w-full" disabled={!answered} onClick={next}>
                {index + 1 === quizQuestions.length ? "See results" : "Next question"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SiteLayout>
  );
}
