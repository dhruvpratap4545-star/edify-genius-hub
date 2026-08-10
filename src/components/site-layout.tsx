import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/tutor", label: "Dhruv AI" },
  { to: "/quiz", label: "Quiz" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Dhruv Academy</span>
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
          Dhruv Academy — demo mode. All courses, progress and tutor replies are sample data.
        </div>
      </footer>
    </div>
  );
}
