import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw, SlidersHorizontal, Trash2 } from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  STORAGE_KEYS,
  defaultSettings,
  useSettings,
  type Settings as AppSettings,
} from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Dhruv Academy" },
      {
        name: "description",
        content:
          "Control sound, read-aloud narration, motion and quiz explanations, or reset your locally stored Dhruv Academy data.",
      },
      { property: "og:title", content: "Settings — Dhruv Academy" },
      {
        property: "og:description",
        content: "Sound, narration, motion and data controls for Dhruv Academy.",
      },
    ],
  }),
  component: SettingsPage,
});

const toggles: { key: keyof AppSettings; label: string; help: string }[] = [
  { key: "soundEnabled", label: "Sound effects", help: "Play chimes for correct answers." },
  { key: "readAloud", label: "Read aloud", help: "Let Dhruv AI speak replies out loud." },
  { key: "reducedMotion", label: "Reduce motion", help: "Calm down animations and transitions." },
  {
    key: "showExplanations",
    label: "Show quiz explanations",
    help: "Reveal the reasoning after each answer.",
  },
];

function SettingsPage() {
  const [settings, setSettings, hydrated] = useSettings();

  const resetData = () => {
    Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Preferences apply across the app and stay on this device.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <SlidersHorizontal className="size-5 text-primary" /> Learning preferences
            </CardTitle>
            <CardDescription>{hydrated ? "Saved automatically." : "Loading…"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {toggles.map((t) => (
              <div key={t.key} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Label htmlFor={t.key} className="text-sm font-medium">
                    {t.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t.help}</p>
                </div>
                <Switch
                  id={t.key}
                  checked={settings[t.key]}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, [t.key]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Data</CardTitle>
            <CardDescription>
              Progress, history and profile are stored only in this browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setSettings(defaultSettings)}>
              <RotateCcw className="mr-2 size-4" /> Reset preferences
            </Button>
            <Button variant="destructive" onClick={resetData}>
              <Trash2 className="mr-2 size-4" /> Erase all local data
            </Button>
          </CardContent>
        </Card>
      </div>
    </SiteLayout>
  );
}
