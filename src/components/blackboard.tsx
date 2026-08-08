import { useEffect, useState } from "react";

import type { BoardContent } from "@/lib/board-content";
import { TutorAvatar } from "@/components/tutor-avatar";
import { cn } from "@/lib/utils";

type Props = {
  content: BoardContent;
  /** Bumps whenever a new explanation starts, re-triggering the projection. */
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
      {/* lecture room */}
      <div className="relative overflow-hidden rounded-2xl bg-holo-room p-4 sm:p-8">
        {/* ambient room light */}
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_25%_15%,var(--holo-glow),transparent_55%),radial-gradient(circle_at_85%_90%,var(--holo-accent),transparent_45%)]" />

        <div className="relative grid gap-6 lg:grid-cols-[1.6fr_auto] lg:items-end">
          {/* holographic panel */}
          <div
            className="relative animate-[holo-flicker_5s_linear_infinite] overflow-hidden rounded-xl border p-5 sm:p-8"
            style={{
              borderColor: "var(--holo-line)",
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--holo-glow) 14%, transparent), color-mix(in oklab, var(--holo-room) 92%, transparent))",
              boxShadow:
                "0 0 24px color-mix(in oklab, var(--holo-glow) 45%, transparent), inset 0 0 40px color-mix(in oklab, var(--holo-glow) 18%, transparent)",
            }}
          >
            {/* grid + scanline */}
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(var(--holo-line)_1px,transparent_1px),linear-gradient(90deg,var(--holo-line)_1px,transparent_1px)] [background-size:38px_38px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-[holo-scan_6s_linear_infinite] bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--holo-glow)_30%,transparent),transparent)]" />

            <div className="relative text-holo-text">
              <p className="text-[11px] uppercase tracking-[0.35em] text-holo-accent">
                {content.topic}
              </p>
              <h2
                className="mt-2 border-b pb-3 text-xl font-semibold uppercase leading-snug tracking-wide sm:text-2xl"
                style={{ borderColor: "color-mix(in oklab, var(--holo-line) 60%, transparent)" }}
              >
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
                    <span className="text-holo-accent">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {content.formula && (
                <p
                  className={cn(
                    "mt-5 inline-block rounded-md border px-4 py-2 font-mono text-sm text-holo-accent transition-all duration-500 sm:text-base",
                    shown(content.points.length) ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    borderColor: "var(--holo-accent)",
                    boxShadow: "0 0 14px color-mix(in oklab, var(--holo-accent) 40%, transparent)",
                  }}
                >
                  {content.formula}
                </p>
              )}

              {content.aside && (
                <p
                  className={cn(
                    "mt-4 text-xs italic text-holo-text/70 transition-opacity duration-500 sm:text-sm",
                    shown(content.points.length + (content.formula ? 1 : 0))
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                >
                  {content.aside}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <TutorAvatar speaking={writing} />
          </div>
        </div>
      </div>
    </div>
  );
}
