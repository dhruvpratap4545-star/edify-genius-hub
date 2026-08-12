import { useCallback, useEffect, useState } from "react";

/** Namespaced localStorage keys used across the app. */
export const STORAGE_KEYS = {
  profile: "dhruv.profile",
  settings: "dhruv.settings",
  history: "dhruv.history",
  lessons: "dhruv.lessons",
} as const;

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? ({ ...fallback, ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}

function readArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * SSR-safe persisted state. Starts from `initial` on the server and during the
 * first client render (so hydration always matches), then loads localStorage.
 */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = Array.isArray(initial)
      ? (readArray(key, initial as unknown as unknown[]) as unknown as T)
      : typeof initial === "object" && initial !== null
        ? readJSON(key, initial)
        : ((): T => {
            try {
              const raw = window.localStorage.getItem(key);
              return raw ? (JSON.parse(raw) as T) : initial;
            } catch {
              return initial;
            }
          })();
    setValue(loaded);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — keep in-memory state */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}

export type Profile = {
  name: string;
  grade: string;
  language: "English" | "Hindi" | "Hinglish";
  goalMinutes: number;
};

export const defaultProfile: Profile = {
  name: "Dhruv",
  grade: "Class 8",
  language: "Hinglish",
  goalMinutes: 300,
};

export type Settings = {
  soundEnabled: boolean;
  readAloud: boolean;
  reducedMotion: boolean;
  showExplanations: boolean;
};

export const defaultSettings: Settings = {
  soundEnabled: true,
  readAloud: true,
  reducedMotion: false,
  showExplanations: true,
};

export type HistoryEntry = {
  id: string;
  kind: "quiz" | "lesson" | "tutor";
  title: string;
  detail: string;
  at: string;
};

export function useProfile() {
  return usePersistentState<Profile>(STORAGE_KEYS.profile, defaultProfile);
}

export function useSettings() {
  return usePersistentState<Settings>(STORAGE_KEYS.settings, defaultSettings);
}

export function useHistory() {
  const [history, setHistory, hydrated] = usePersistentState<HistoryEntry[]>(
    STORAGE_KEYS.history,
    [],
  );

  const add = useCallback(
    (entry: Omit<HistoryEntry, "id" | "at">) => {
      setHistory((prev) =>
        [
          {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            at: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 100),
      );
    },
    [setHistory],
  );

  const clear = useCallback(() => setHistory([]), [setHistory]);

  return { history, add, clear, hydrated };
}

export function useLessonProgress() {
  const [done, setDone, hydrated] = usePersistentState<string[]>(STORAGE_KEYS.lessons, []);

  const toggle = useCallback(
    (id: string) =>
      setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setDone],
  );

  return { done, toggle, hydrated };
}

export function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
