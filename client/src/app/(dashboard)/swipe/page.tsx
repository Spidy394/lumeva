"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer";
import { X, Heart } from "lucide-react";

type DiscoverUser = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  image: string | null;
  skillsToTeach: { skillId: string; name: string }[];
  skillsToLearn: { skillId: string; name: string }[];
};

const DUMMY_USERS: DiscoverUser[] = [
  {
    id: "dummy-1",
    name: "Aisha Raza",
    bio: "Full-stack dev building fintech tools. Love clean APIs and great UX.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    image: null,
    skillsToTeach: [
      { skillId: "s1", name: "React" },
      { skillId: "s2", name: "Node.js" },
    ],
    skillsToLearn: [
      { skillId: "s3", name: "UI Design" },
      { skillId: "s4", name: "Figma" },
    ],
  },
  {
    id: "dummy-2",
    name: "Dev Kapoor",
    bio: "ML engineer passionate about recommendation systems and LLMs.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    image: null,
    skillsToTeach: [
      { skillId: "s5", name: "Python" },
      { skillId: "s6", name: "Machine Learning" },
    ],
    skillsToLearn: [
      { skillId: "s7", name: "Next.js" },
      { skillId: "s8", name: "TypeScript" },
    ],
  },
  {
    id: "dummy-3",
    name: "Sara Malik",
    bio: "Product designer crafting delightful mobile experiences.",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    image: null,
    skillsToTeach: [
      { skillId: "s9", name: "Figma" },
      { skillId: "s10", name: "UI/UX Design" },
    ],
    skillsToLearn: [
      { skillId: "s11", name: "React Native" },
      { skillId: "s12", name: "Tailwind CSS" },
    ],
  },
  {
    id: "dummy-4",
    name: "Ayan Sheikh",
    bio: "Backend engineer. Obsessed with distributed systems and Postgres.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    image: null,
    skillsToTeach: [
      { skillId: "s13", name: "PostgreSQL" },
      { skillId: "s14", name: "Go" },
    ],
    skillsToLearn: [
      { skillId: "s15", name: "DevOps" },
      { skillId: "s16", name: "Docker" },
    ],
  },
  {
    id: "dummy-5",
    name: "Riya Joshi",
    bio: "Indie hacker building SaaS tools. Currently learning AI integrations.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    image: null,
    skillsToTeach: [
      { skillId: "s17", name: "Vue.js" },
      { skillId: "s18", name: "Content Strategy" },
    ],
    skillsToLearn: [
      { skillId: "s19", name: "LangChain" },
      { skillId: "s20", name: "OpenAI API" },
    ],
  },
];

export default function SwipePage() {
  const [users] = useState<DiscoverUser[]>(DUMMY_USERS);
  const [index, setIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [matched, setMatched] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

  if (index >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[85vh] text-gray-500 gap-3">
        <p className="text-lg">No more builders 👀</p>
        <p className="text-sm text-gray-400">Add more skills to your profile to discover compatible partners!</p>
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
    if (isSwiping) return;
    setIsSwiping(true);

    x.set(direction === "RIGHT" ? 600 : -600);

    if (direction === "RIGHT") {
      setMatched(true);
      setTimeout(() => setMatched(false), 2000);
    }

    setTimeout(() => {
      setIndex((prev) => prev + 1);
      x.set(0);
      setIsSwiping(false);
    }, 250);
  };

  const avatarSrc = user.avatarUrl ?? user.image;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 relative">

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
              <h2 className="text-4xl font-bold">It&apos;s a Match! 🎉</h2>
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
            alt={`${user.name}'s profile`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <span className="text-7xl text-white/30 font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
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

          {/* Skills as Labeled Pills */}
          {user.skillsToTeach.length > 0 && (
            <div>
              <p className="text-xs text-green-300 mb-1">Can teach</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsToTeach.map((skill) => (
                  <span
                    key={`teach-${skill.skillId}`}
                    className="px-3 py-1 text-xs bg-green-500/20 backdrop-blur-md rounded-full border border-green-400/30 text-green-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.skillsToLearn.length > 0 && (
            <div>
              <p className="text-xs text-violet-300 mb-1">Wants to learn</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsToLearn.map((skill) => (
                  <span
                    key={`learn-${skill.skillId}`}
                    className="px-3 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

      </motion.div>

      {/* Action Buttons */}
      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={() => swipe("LEFT")}
          disabled={isSwiping}
          className="w-16 h-16 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition disabled:opacity-50 group"
          aria-label="Pass"
        >
          <X size={28} className="text-red-500 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => swipe("RIGHT")}
          disabled={isSwiping}
          className="w-16 h-16 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition disabled:opacity-50 group"
          aria-label="Like"
        >
          <Heart size={28} className="text-green-500 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
}