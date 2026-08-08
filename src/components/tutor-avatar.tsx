import { cn } from "@/lib/utils";

type Props = {
  speaking: boolean;
  className?: string;
};

/** Lightweight SVG tutor who blinks, and mouths words while explaining. */
export function TutorAvatar({ speaking, className }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg
        viewBox="0 0 120 150"
        role="img"
        aria-label={speaking ? "AI tutor explaining at the board" : "AI tutor waiting"}
        className="w-20 drop-shadow-sm sm:w-24"
      >
        {/* body */}
        <path
          d="M18 150c0-24 19-38 42-38s42 14 42 38z"
          className="fill-primary"
        />
        <path
          d="M60 112c-7 10-13 16-13 16l-8-12 9-6zM60 112c7 10 13 16 13 16l8-12-9-6z"
          className="fill-primary-foreground/25"
        />
        {/* neck */}
        <rect x="52" y="94" width="16" height="20" rx="7" className="fill-accent/70" />
        {/* head */}
        <ellipse cx="60" cy="64" rx="34" ry="36" className="fill-accent" />
        {/* hair */}
        <path
          d="M26 60c0-22 15-34 34-34s34 12 34 34c0-10-14-14-34-14s-34 4-34 14z"
          className="fill-accent-foreground/80"
        />
        {/* eyes */}
        <g className="fill-accent-foreground">
          <ellipse cx="47" cy="63" rx="4" ry="5" className="origin-center animate-[blink_5s_ease-in-out_infinite]" />
          <ellipse cx="73" cy="63" rx="4" ry="5" className="origin-center animate-[blink_5s_ease-in-out_infinite]" />
        </g>
        {/* brows */}
        <g className="stroke-accent-foreground/70" strokeWidth="3" strokeLinecap="round">
          <line x1="41" y1="53" x2="53" y2="51" />
          <line x1="67" y1="51" x2="79" y2="53" />
        </g>
        {/* mouth */}
        {speaking ? (
          <ellipse
            cx="60"
            cy="80"
            rx="7"
            ry="6"
            className="fill-accent-foreground origin-[60px_80px] animate-[talk_0.4s_ease-in-out_infinite]"
          />
        ) : (
          <path
            d="M52 79c4 5 12 5 16 0"
            fill="none"
            className="stroke-accent-foreground"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
        {speaking ? "Explaining…" : "Ready"}
      </span>
    </div>
  );
}
