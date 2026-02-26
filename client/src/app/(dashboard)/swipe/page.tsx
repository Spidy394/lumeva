"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer";

const users = [
  {
    id: 1,
    name: "Ayan",
    bio: "Full stack dev building SaaS.",
    skills: ["React", "Node"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
  },
  {
    id: 2,
    name: "Riya",
    bio: "UI/UX Designer crafting experiences.",
    skills: ["Figma", "Brand"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
  },
  {
    id: 3,
    name: "Dev",
    bio: "AI Engineer. ML + Product.",
    skills: ["Python", "ML"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  },
];

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

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
      swipe("right");
    } else if (info.offset.x < -150) {
      swipe("left");
    }
  };

  const swipe = (direction: "left" | "right") => {
    setIsSwiping(true);

    const finalX = direction === "right" ? 600 : -600;
    x.set(finalX);

    setTimeout(() => {
      setIndex((prev) => prev + 1);
      x.set(0);
      setIsSwiping(false);
    }, 250);
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-6">

      <motion.div
        key={user.id}
        drag={!isSwiping ? "x" : false}
        style={{ x, rotate }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-sm h-[520px] rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Background Image */}
        <img
          src={user.image}
          className="absolute inset-0 w-full h-full object-cover"
        />

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
              {user.bio}
            </p>
          </div>

          {/* Skills as Tinder Style Pills */}
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full border border-white/30"
              >
                {skill}
              </span>
            ))}
          </div>

        </div>

      </motion.div>

    </div>
  );
}