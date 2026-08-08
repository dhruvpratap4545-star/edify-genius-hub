import { useEffect, useState } from "react";

import type { BoardContent } from "@/lib/board-content";
import { TutorAvatar } from "@/components/tutor-avatar";
import { cn } from "@/lib/utils";

type Props = {
  content: BoardContent;
  /** Bumps whenever a new explanation starts, re-triggering the chalk writing. */
  revision: number;
  className?: string;
};

export function Blackboard({ content, revision, className }: Props) {
  const total = content.points.length + (content.formula ? 1 : 0) + (content.aside ? 1 : 0);
  const [written, setWritten] = useState(total);

  useEffect(() => {
    setWritten(0);
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setWritten(step);
      if (step >= total) clearInterval(timer);
    }, 650);
    return () => clearInterval(timer);
  }, [revision, total]);

  const writing = written < total;
  const shown = (index: number) => index < written;

  return (
    <div className={cn("relative", className)}>
      <div className="rounded-2xl bg-[--chalkboard-frame] p-3 shadow-lg sm:p-4">
        <div className="relative overflow-hidden rounded-xl bg-[--chalkboard] p-5 text-[--chalk] sm:p-8">
          {/* dusty chalk haze */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background:radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />

          <p className="text-xs uppercase tracking-[0.25em] text-[--chalk-accent]">
            {content.topic}
          </p>
          <h2 className="mt-2 border-b border-dashed border-[--chalk]/30 pb-3 text-xl font-semibold leading-snug sm:text-2xl">
            {content.title}
          </h2>

          <ul className="mt-4 space-y-3 text-sm sm:text-base">
            {content.points.map((point, i) => (
              <li
                key={point}
                className={cn(
                  "flex gap-3 transition-all duration-500",
                  shown(i) ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                )}
              >
                <span className="text-[--chalk-accent]">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {content.formula && (
            <p
              className={cn(
                "mt-5 inline-block rounded-md border border-[--chalk]/30 px-4 py-2 font-mono text-sm text-[--chalk-accent] transition-all duration-500 sm:text-base",
                shown(content.points.length) ? "opacity-100" : "opacity-0",
              )}
            >
              {content.formula}
            </p>
          )}

          {content.aside && (
            <p
              className={cn(
                "mt-4 text-xs italic text-[--chalk]/70 transition-opacity duration-500 sm:text-sm",
                shown(content.points.length + (content.formula ? 1 : 0))
                  ? "opacity-100"
                  : "opacity-0",
              )}
            >
              {content.aside}
            </p>
          )}

          <div className="mt-6 h-10 sm:h-0" />
        </div>
      </div>

      <TutorAvatar
        speaking={writing}
        className="absolute -bottom-2 right-2 sm:right-4"
      />
    </div>
  );
}
