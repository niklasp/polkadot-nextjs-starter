"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GithubStarsClientProps {
  repo: string;
}

export function GithubStarsClient({ repo }: GithubStarsClientProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchStars() {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`);
        if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
        const data = (await res.json()) as { stargazers_count?: number };
        if (!cancelled)
          setStars(
            typeof data.stargazers_count === "number"
              ? data.stargazers_count
              : 0,
          );
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }
    fetchStars();
    const id = setInterval(fetchStars, 1000 * 60 * 10);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [repo]);

  const label = stars !== null ? stars.toLocaleString() : "...";

  return (
    <Link
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex"
      aria-label="View GitHub repository"
    >
      <Button
        size="sm"
        className="h-8 px-3 gap-2 text-xs fixed top-4 right-4 z-50"
        variant="outline"
      >
        <Github className="w-4 h-4" />

        {label}
        <Star className="w-4 h-4" />
      </Button>
    </Link>
  );
}
