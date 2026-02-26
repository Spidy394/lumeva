"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer";
import { apiFetch } from "@/lib/api";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  image: string | null;
  skillsToTeach: { skillId: string; name: string }[];
  skillsToLearn: { skillId: string; name: string }[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<UserProfile>("/api/users/me").then((res) => {
      if (res.success && res.data) {
        setProfile(res.data);
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

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">

      {/* COVER */}
      <div className="h-40 bg-gradient-to-r from-violet-600 to-purple-600 relative" />

      {/* PROFILE HEADER */}
      <div className="px-6 md:px-12 -mt-16 relative">

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
          {(profile.avatarUrl || profile.image) && (
            <img
              src={profile.avatarUrl || profile.image || ""}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Name + Edit */}
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">
              {profile.name}
            </h1>
            <p className="text-gray-600 mt-1">
              {profile.bio || "No bio yet"}
            </p>
          </div>

          <Link
            href="/profile/edit"
            className="px-4 py-2 bg-violet-600 text-white rounded-xl hover:opacity-90 transition"
          >
            Edit
          </Link>
        </div>

        {/* Skills */}
        {profile.skillsToTeach.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm text-gray-500 mb-2">Skills to Teach</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skillsToTeach.map((skill) => (
                <span
                  key={skill.skillId}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.skillsToLearn.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm text-gray-500 mb-2">Skills to Learn</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skillsToLearn.map((skill) => (
                <span
                  key={skill.skillId}
                  className="px-3 py-1 text-sm bg-violet-100 text-violet-700 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}