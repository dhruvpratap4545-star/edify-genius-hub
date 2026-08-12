import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, User, Volume2, VolumeX } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Blackboard } from "@/components/blackboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { boardFor, welcomeBoard, type BoardContent } from "@/lib/board-content";
import { speakHindi, stopSpeaking } from "@/lib/kids-mode";
import { tutorReply } from "@/lib/demo-data";
import { useHistory, useSettings } from "@/lib/store";

export const Route = createFileRoute("/tutor")({
  head: () => ({
    meta: [
      { title: "Dhruv AI — Dhruv Academy" },
      {
        name: "description",
        content:
          "Ask the Dhruv Academy Socratic tutor about calculus, machine learning, Python, quantum computing or study technique.",
      },
      { property: "og:title", content: "Dhruv AI — Dhruv Academy" },
      {
        property: "og:description",
        content:
          "A Socratic study partner that guides you to the answer instead of handing it over.",
      },
    ],
  }),
  component: TutorPage,
});

type Message = { id: number; role: "user" | "tutor"; text: string };

const starters = [
  "Explain the chain rule with an example",
  "Why is my model overfitting?",
  "How do I debug this Python error?",
  "Build me a revision schedule for exams",
];

function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "tutor",
      text: "Welcome to Dhruv Academy! I am Dhruv AI, your personal tutor. How can I help you learn today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [board, setBoard] = useState<BoardContent>(welcomeBoard);
  const [revision, setRevision] = useState(0);
  const [settings] = useSettings();
  const { add } = useHistory();

  const send = (text: string) => {
    const question = text.trim();
    if (!question || thinking) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: question }]);
    setInput("");
    setThinking(true);
    add({ kind: "tutor", title: question, detail: "Asked Dhruv AI" });

    window.setTimeout(() => {
      const reply = tutorReply(question);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "tutor", text: reply }]);
      setBoard(boardFor(question));
      setRevision((r) => r + 1);
      if (settings.readAloud) speakHindi(reply);
      setThinking(false);
    }, 600);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
        <Blackboard content={board} revision={revision} />

        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <Card className="flex h-[60vh] flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="size-5 text-primary" /> Dhruv AI
              </CardTitle>
              <CardDescription>Socratic mode · demo responses run offline</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 overflow-y-auto py-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "tutor" && (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.role === "tutor" && (
                      <button
                        type="button"
                        onClick={() => speakHindi(message.text)}
                        className="mt-2 flex items-center gap-1 text-xs font-medium text-primary"
                      >
                        <Volume2 className="size-3.5" /> Read aloud
                      </button>
                    )}
                  </div>
                  {message.role === "user" && (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <User className="size-4" />
                    </span>
                  )}
                </div>
              ))}
              {thinking && <p className="text-sm text-muted-foreground">Dhruv AI is thinking…</p>}
            </CardContent>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-border p-4"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a concept, a problem, or your study plan…"
                aria-label="Message Dhruv AI"
              />
              <Button type="button" variant="outline" onClick={stopSpeaking} aria-label="Stop audio">
                <VolumeX className="size-4" />
              </Button>
              <Button type="submit" disabled={thinking} aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </form>
          </Card>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Try a starter</CardTitle>
                <CardDescription>One tap to see how the tutor responds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {starters.map((starter) => (
                  <Button
                    key={starter}
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal text-left"
                    onClick={() => send(starter)}
                  >
                    {starter}
                  </Button>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">How this tutor works</CardTitle>
                <CardDescription>
                  It answers with a question first, checks your reasoning, then gives one practice
                  problem. In demo mode replies come from a built-in response set, so nothing leaves
                  your browser.
                </CardDescription>
              </CardHeader>
            </Card>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
