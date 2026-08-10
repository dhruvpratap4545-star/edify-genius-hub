import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Square, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  kidsStories,
  kidsTopics,
  speakHindi,
  stopSpeaking,
  type StoryCard,
} from "@/lib/kids-mode";

const tintClass: Record<string, string> = {
  sun: "from-kid-sun to-kid-candy",
  sky: "from-kid-sky to-kid-leaf",
  leaf: "from-kid-leaf to-kid-sky",
  berry: "from-kid-berry to-kid-candy",
  candy: "from-kid-candy to-kid-sun",
};

type Props = {
  onPick: (prompt: string) => void;
};

export function KidsPlayground({ onPick }: Props) {
  const [story, setStory] = useState<StoryCard | null>(null);
  const [page, setPage] = useState(0);

  const openStory = (card: StoryCard) => {
    setStory(card);
    setPage(0);
    speakHindi(`${card.title}। ${card.pages[0] ?? ""}`);
  };

  const turn = (delta: number) => {
    if (!story) return;
    const next = Math.min(Math.max(page + delta, 0), story.pages.length - 1);
    setPage(next);
    speakHindi(story.pages[next] ?? "");
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-center text-2xl font-extrabold">आज क्या करें? 🎉</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {kidsTopics.map((topic, index) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => onPick(topic.prompt)}
              style={{ animationDelay: `${index * 0.18}s` }}
              className={`kid-tile group flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br ${tintClass[topic.tint]} p-5 text-kid-ink shadow-[0_10px_0_0_oklch(0_0_0/0.12)] transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-[0_4px_0_0_oklch(0_0_0/0.12)]`}
            >
              <span className="text-5xl drop-shadow-[0_4px_6px_oklch(0_0_0/0.25)] transition-transform group-hover:scale-110">
                {topic.emoji}
              </span>
              <span className="text-center text-base font-bold leading-tight">{topic.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl font-extrabold">
          <BookOpen className="size-6" /> कहानी की किताबें
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {kidsStories.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => openStory(card)}
              className={`flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br ${tintClass[card.tint]} p-4 text-kid-ink shadow-[0_8px_0_0_oklch(0_0_0/0.12)] transition-transform hover:-translate-y-1 active:translate-y-1`}
            >
              <span className="text-4xl">{card.emoji}</span>
              <span className="text-center text-sm font-bold leading-tight">{card.title}</span>
            </button>
          ))}
        </div>
      </section>

      {story && (
        <section className="rounded-3xl border-4 border-kid-sun bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-extrabold">
              {story.emoji} {story.title}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => { stopSpeaking(); setStory(null); }}>
              बंद करें
            </Button>
          </div>
          <p className="mt-4 min-h-24 rounded-2xl bg-muted p-5 text-lg font-medium leading-relaxed">
            {story.pages[page]}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="outline" onClick={() => turn(-1)} disabled={page === 0}>
              <ChevronLeft className="size-5" /> पिछला
            </Button>
            <Button size="lg" onClick={() => speakHindi(story.pages[page] ?? "")}>
              <Volume2 className="size-5" /> सुनाओ
            </Button>
            <Button size="lg" variant="secondary" onClick={stopSpeaking}>
              <Square className="size-4" /> रुको
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => turn(1)}
              disabled={page === story.pages.length - 1}
            >
              अगला <ChevronRight className="size-5" />
            </Button>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            पन्ना {page + 1} / {story.pages.length}
          </p>
        </section>
      )}
    </div>
  );
}
