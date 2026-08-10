import { cn } from "@/lib/utils";

type Props = {
  speaking: boolean;
  className?: string;
};

/** Holographic tutor projection: blinks, mouths words and points at the board. */
export function TutorAvatar({ speaking, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative animate-[holo-float_6s_ease-in-out_infinite]">
        <svg
          viewBox="0 0 140 160"
          role="img"
          aria-label={speaking ? "Dhruv AI explaining at the board" : "Dhruv AI waiting"}
          className="w-32 animate-[holo-flicker_4s_linear_infinite] sm:w-44"
          style={{ filter: "drop-shadow(0 0 10px var(--holo-glow))" }}
        >
          <defs>
            <linearGradient id="holoBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--holo-text)" stopOpacity="0.85" />
              <stop offset="70%" stopColor="var(--holo-glow)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--holo-glow)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <g
            stroke="var(--holo-line)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="url(#holoBody)"
          >
            {/* torso / dress */}
            <path d="M44 152c0-30 8-52 26-52s26 22 26 52z" />
            {/* pointing arm toward the board */}
            <path d="M52 106 18 84l4-7 34 18z" />
            {/* resting arm holding a book */}
            <path d="M88 106l16 16-6 6-16-14z" />
            {/* neck */}
            <rect x="62" y="82" width="16" height="18" rx="7" />
            {/* head */}
            <ellipse cx="70" cy="60" rx="24" ry="26" />
            {/* hair */}
            <path d="M46 58c0-16 11-25 24-25s24 9 24 25c0-8-10-11-24-11s-24 3-24 11z" fillOpacity="0.9" />
          </g>

          {/* eyes */}
          <g fill="var(--holo-room)">
            <ellipse cx="61" cy="59" rx="3" ry="4" className="origin-center animate-[blink_5s_ease-in-out_infinite]" />
            <ellipse cx="79" cy="59" rx="3" ry="4" className="origin-center animate-[blink_5s_ease-in-out_infinite]" />
          </g>
          {/* glasses */}
          <g stroke="var(--holo-accent)" strokeWidth="1.4" fill="none">
            <circle cx="61" cy="59" r="7" />
            <circle cx="79" cy="59" r="7" />
            <line x1="68" y1="59" x2="72" y2="59" />
          </g>
          {/* mouth */}
          {speaking ? (
            <ellipse
              cx="70"
              cy="73"
              rx="5"
              ry="4"
              fill="var(--holo-room)"
              className="origin-[70px_73px] animate-[talk_0.4s_ease-in-out_infinite]"
            />
          ) : (
            <path d="M64 72c3 4 9 4 12 0" fill="none" stroke="var(--holo-room)" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* projector pad */}
          <ellipse
            cx="70"
            cy="153"
            rx="34"
            ry="6"
            fill="var(--holo-glow)"
            className="animate-[holo-pulse_3s_ease-in-out_infinite]"
          />
        </svg>
      </div>
      <span
        className="rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide uppercase"
        style={{
          borderColor: "var(--holo-line)",
          color: "var(--holo-text)",
          background: "color-mix(in oklab, var(--holo-glow) 12%, transparent)",
        }}
      >
        {speaking ? "Explaining…" : "Standing by"}
      </span>
    </div>
  );
}
