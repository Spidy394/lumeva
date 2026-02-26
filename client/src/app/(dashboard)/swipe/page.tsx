"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer";
import { apiFetch } from "@/lib/api";

type DiscoverUser = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  image: string | null;
  skillsToTeach: { skillId: string; name: string }[];
  skillsToLearn: { skillId: string; name: string }[];
};

export default function SwipePage() {
  const [users, setUsers] = useState<DiscoverUser[]>([]);
  const [index, setIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matched, setMatched] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

  useEffect(() => {
    apiFetch<DiscoverUser[]>("/api/users/discover").then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (index >= users.length) {
    return (
      <div className="flex items-center justify-center h-[85vh] text-gray-500">
        No more builders 👀
      </div>
    );
  }

  const user = users[index];

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 150) {
      swipe("RIGHT");
    } else if (info.offset.x < -150) {
      swipe("LEFT");
    }
  };

  const swipe = async (direction: "LEFT" | "RIGHT") => {
    setIsSwiping(true);

    const finalX = direction === "RIGHT" ? 600 : -600;
    x.set(finalX);

    // Record swipe in backend
    const res = await apiFetch<{ matched: boolean }>("/api/swipes", {
      method: "POST",
      body: JSON.stringify({ targetId: user.id, direction }),
    });

    if (res.success && res.data?.matched) {
      setMatched(true);
      setTimeout(() => setMatched(false), 2000);
    }

    setTimeout(() => {
      setIndex((prev) => prev + 1);
      x.set(0);
      setIsSwiping(false);
    }, 250);
  };

  const allSkills = [
    ...user.skillsToTeach.map((s) => s.name),
    ...user.skillsToLearn.map((s) => s.name),
  ];

  const avatarSrc = user.avatarUrl || user.image;

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-6 relative">

      {/* Match overlay */}
      <AnimatePresence>
        {matched && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 z-50 rounded-3xl"
          >
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold">It's a Match! 🎉</h2>
              <p className="mt-2 text-lg text-white/80">You both swiped right!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={user.id}
        drag={!isSwiping ? "x" : false}
        style={{ x, rotate }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-sm h-[520px] rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Background */}
        {avatarSrc ? (
          <img
            src={avatarSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600" />
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* LIKE Badge */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-8 text-green-400 font-bold text-2xl border-4 border-green-400 px-4 py-1 rounded-md -rotate-12 bg-black/40 backdrop-blur-md"
        >
          LIKE
        </motion.div>

        {/* NOPE Badge */}
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-8 text-red-400 font-bold text-2xl border-4 border-red-400 px-4 py-1 rounded-md rotate-12 bg-black/40 backdrop-blur-md"
        >
          NOPE
        </motion.div>

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-4">

          <div>
            <h2 className="text-2xl font-semibold">
              {user.name}
            </h2>
            <p className="text-sm text-gray-200 mt-1">
              {user.bio || "No bio yet"}
            </p>
          </div>

          {/* Skills as Pills */}
          {allSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

        </div>

      </motion.div>

    </div>
  );
}