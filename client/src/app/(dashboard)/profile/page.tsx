"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer";

const mockUser = {
  name: "Samman Das",
  bio: "Full-stack developer building SaaS & AI tools 🚀",
  skills: ["React", "Next.js", "Postgres", "AI", "TypeScript"],
  stats: {
    posts: 12,
    matches: 8,
    projects: 3,
  },
};

const mockPosts = [
  {
    id: 1,
    text: "Launching my new SaaS MVP soon 🚀",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
  },
  {
    id: 2,
    text: "Building an AI-powered recommendation engine.",
  },
  {
    id: 3,
    text: "Looking for a frontend collaborator!",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800",
  },
];

export default function ProfilePage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <div className="h-full overflow-y-auto">

      {/* COVER */}
      <div className="h-40 bg-gradient-to-r from-violet-600 to-purple-600 relative" />

      {/* PROFILE HEADER */}
      <div className="px-6 md:px-12 -mt-16 relative">

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200" />

        {/* Name + Edit */}
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              {mockUser.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {mockUser.bio}
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="px-4 py-2 bg-violet-600 text-white rounded-xl hover:opacity-90 transition"
          >
            Edit
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-6 text-center">
          {Object.entries(mockUser.stats).map(
            ([key, value]) => (
              <div key={key}>
                <div className="font-semibold text-lg">
                  {value}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {key}
                </div>
              </div>
            )
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {mockUser.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-violet-100 text-violet-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* POSTS SECTION */}
      <div className="px-6 md:px-12 py-8">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Posts
          </h2>
          <span className="text-sm text-gray-500">
            {mockPosts.length} posts
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl shadow-sm p-5 space-y-4 cursor-pointer hover:shadow-md transition"
            >
              <p className="text-gray-800">
                {post.text}
              </p>

              {post.image && (
                <img
                  src={post.image}
                  className="rounded-xl object-cover w-full max-h-64"
                />
              )}
            </div>
          ))}
        </div>

      </div>

      {/* POST MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p>{selectedPost.text}</p>

              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  className="rounded-xl mt-4"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}