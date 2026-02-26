"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

type MatchedUser = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  image: string | null;
  skillsToTeach: { skillId: string; name: string }[];
  skillsToLearn: { skillId: string; name: string }[];
};

type MatchItem = {
  matchId: string;
  matchedAt: string;
  user: MatchedUser | null;
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<MatchItem[]>("/api/matches").then((res) => {
      if (res.success && res.data) {
        setMatches(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500 gap-2">
        <p className="text-lg">No matches yet</p>
        <p className="text-sm">Start swiping to find your skill-swap partners! 🚀</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">

      <div className="p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-6">Your Matches</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => {
            if (!match.user) return null;

            const avatarSrc = match.user.avatarUrl || match.user.image;

            return (
              <div
                key={match.matchId}
                className="bg-white rounded-2xl shadow-sm p-5 space-y-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {avatarSrc && (
                      <img
                        src={avatarSrc}
                        alt={match.user.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{match.user.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {match.user.bio || "No bio"}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {match.user.skillsToTeach.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {match.user.skillsToTeach.map((s) => (
                      <span
                        key={s.skillId}
                        className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  Matched {new Date(match.matchedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}