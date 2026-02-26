"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("Samman Das");
  const [bio, setBio] = useState(
    "Full-stack developer building SaaS & AI tools 🚀"
  );
  const [skills, setSkills] = useState([
    "React",
    "Next.js",
    "Postgres",
    "AI",
  ]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="h-full overflow-y-auto p-8">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT - FORM */}
        <div className="space-y-8">

          <h1 className="text-3xl font-semibold">
            Edit Profile
          </h1>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <label className="text-sm text-gray-500">
              Skills
            </label>

            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) =>
                  setNewSkill(e.target.value)
                }
                placeholder="Add skill"
                className="flex-1 border rounded-xl px-4 py-2"
              />
              <button
                onClick={addSkill}
                className="px-4 bg-violet-600 text-white rounded-xl"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  layout
                  className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() =>
                      removeSkill(skill)
                    }
                    className="text-xs"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="px-6 py-2 bg-violet-600 text-white rounded-xl"
            >
              Save Changes
            </button>
          </div>

        </div>

        {/* RIGHT - LIVE PREVIEW */}
        <div className="hidden md:block">

          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">

            <div className="h-24 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl" />

            <div className="-mt-12 w-24 h-24 bg-gray-200 rounded-full border-4 border-white" />

            <div>
              <h2 className="text-xl font-semibold">
                {name}
              </h2>
              <p className="text-gray-600 mt-1">
                {bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}