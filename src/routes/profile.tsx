import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Flame, Trophy, UserRound } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, learner } from "@/lib/demo-data";
import { useHistory, useProfile, type Profile } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Dhruv Academy" },
      {
        name: "description",
        content:
          "Update your learner name, class and preferred language, and review badges and enrolled courses.",
      },
      { property: "og:title", content: "Your Profile — Dhruv Academy" },
      {
        property: "og:description",
        content: "Learner details, badges and enrolled courses in Dhruv Academy.",
      },
    ],
  }),
  component: ProfilePage,
});

const languages: Profile["language"][] = ["English", "Hindi", "Hinglish"];

function ProfilePage() {
  const [profile, setProfile, hydrated] = useProfile();
  const { history } = useHistory();

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Personalise how Dhruv AI greets and teaches you. Saved on this device.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserRound className="size-5 text-primary" /> Learner details
              </CardTitle>
              <CardDescription>{hydrated ? "Changes save instantly." : "Loading…"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Class / grade</Label>
                <Input
                  id="grade"
                  value={profile.grade}
                  onChange={(e) => update("grade", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Weekly goal (minutes)</Label>
                <Input
                  id="goal"
                  type="number"
                  min={30}
                  step={30}
                  value={profile.goalMinutes}
                  onChange={(e) =>
                    update("goalMinutes", Math.max(30, Number(e.target.value) || 30))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred language</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang}
                      size="sm"
                      variant={profile.language === lang ? "default" : "outline"}
                      onClick={() => update("language", lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="size-5 text-primary" /> Achievements
                </CardTitle>
                <CardDescription>
                  Level {learner.level} · {learner.xp.toLocaleString()} XP
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {learner.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    <Award className="mr-1 size-3.5" />
                    {badge}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flame className="size-5 text-primary" /> Activity
                </CardTitle>
                <CardDescription>
                  {learner.streak}-day streak · {history.length} logged actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.slug} className="flex items-center justify-between text-sm">
                    <span className="truncate pr-3">{course.title}</span>
                    <span className="shrink-0 text-muted-foreground">{course.progress}%</span>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link to="/history">View full history</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
