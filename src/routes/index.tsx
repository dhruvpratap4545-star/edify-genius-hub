import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { Sparkles, Bot, LineChart, BookOpen, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhruv Academy – Your Personal AI Guide for Learning" },
      { name: "description", content: "Adaptive courses, Socratic AI tutor, and progress analytics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-8">
        <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50">
          <Sparkles className="w-4 h-4 mr-2 inline text-yellow-500" />
          Dhruv Academy AI v2.0 Active
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-primary">Dhruv Academy</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl">
          Your personal 3D AI Guide, Language Switcher, Parent Growth Dashboard, and Child Privacy Shield are now active.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" /> AI Avatar & Speech
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Interactive Socratic learning avatar with real-time speech synthesis.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-green-500" /> Positive Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Comprehensive growth metrics with 100% student chat privacy rules.</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> WhatsApp Auth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Instant Magic Link generator for child sub-profiles with Voice-Name login.</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4">
          <Button size="lg" className="rounded-full px-8 text-base">
            Explore Dashboard
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
