"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer";
import { apiFetch } from "@/lib/api";

type Skill = { id: string; name: string };
type UserSkill = { skillId: string; name: string; type: "TEACH" | "LEARN" };

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // All available skills
  const [allSkills, setAllSkills] = useState<Skill[]>([]);

  // User's current skills
  const [teachSkills, setTeachSkills] = useState<{ skillId: string; name: string }[]>([]);
  const [learnSkills, setLearnSkills] = useState<{ skillId: string; name: string }[]>([]);

  // New skill input
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState<"TEACH" | "LEARN">("TEACH");

  useEffect(() => {
    Promise.all([
      apiFetch<any>("/api/users/me"),
      apiFetch<Skill[]>("/api/skills"),
    ]).then(([profileRes, skillsRes]) => {
      if (profileRes.success && profileRes.data) {
        setName(profileRes.data.name || "");
        setBio(profileRes.data.bio || "");
        setTeachSkills(profileRes.data.skillsToTeach || []);
        setLearnSkills(profileRes.data.skillsToLearn || []);
      }
      if (skillsRes.success && skillsRes.data) {
        setAllSkills(skillsRes.data);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await apiFetch("/api/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, bio }),
    });
    setSaving(false);
    router.push("/profile");
  };

  const handleAddSkill = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    // Find or create the skill
    let skill = allSkills.find(
      (s) => s.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (!skill) {
      const res = await apiFetch<Skill>("/api/skills", {
        method: "POST",
        body: JSON.stringify({ name: trimmed }),
      });
      if (res.success && res.data) {
        skill = res.data;
        setAllSkills((prev) => [...prev, skill!]);
      } else {
        return;
      }
    }

    // Add to user skills
    await apiFetch("/api/skills/my", {
      method: "POST",
      body: JSON.stringify({ skillId: skill.id, type: skillType }),
    });

    const entry = { skillId: skill.id, name: skill.name };
    if (skillType === "TEACH") {
      setTeachSkills((prev) => [...prev, entry]);
    } else {
      setLearnSkills((prev) => [...prev, entry]);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = async (
    skillId: string,
    type: "TEACH" | "LEARN"
  ) => {
    await apiFetch(`/api/skills/my/${skillId}/${type}`, {
      method: "DELETE",
    });

    if (type === "TEACH") {
      setTeachSkills((prev) => prev.filter((s) => s.skillId !== skillId));
    } else {
      setLearnSkills((prev) => prev.filter((s) => s.skillId !== skillId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              Add Skill
            </label>

            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Skill name"
                className="flex-1 border rounded-xl px-4 py-2"
                list="skill-suggestions"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSkill();
                }}
              />
              <datalist id="skill-suggestions">
                {allSkills.map((s) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
              <select
                value={skillType}
                onChange={(e) => setSkillType(e.target.value as "TEACH" | "LEARN")}
                className="border rounded-xl px-3 py-2 text-sm"
              >
                <option value="TEACH">Teach</option>
                <option value="LEARN">Learn</option>
              </select>
              <button
                onClick={handleAddSkill}
                className="px-4 bg-violet-600 text-white rounded-xl"
              >
                Add
              </button>
            </div>

            {/* Teach Skills */}
            {teachSkills.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Teaching</p>
                <div className="flex flex-wrap gap-2">
                  {teachSkills.map((skill) => (
                    <motion.div
                      key={`teach-${skill.skillId}`}
                      layout
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        onClick={() => handleRemoveSkill(skill.skillId, "TEACH")}
                        className="text-xs"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Learn Skills */}
            {learnSkills.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Learning</p>
                <div className="flex flex-wrap gap-2">
                  {learnSkills.map((skill) => (
                    <motion.div
                      key={`learn-${skill.skillId}`}
                      layout
                      className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        onClick={() => handleRemoveSkill(skill.skillId, "LEARN")}
                        className="text-xs"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
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
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-violet-600 text-white rounded-xl disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
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
                {name || "Your Name"}
              </h2>
              <p className="text-gray-600 mt-1">
                {bio || "Your bio"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {teachSkills.map((skill) => (
                <span
                  key={`preview-teach-${skill.skillId}`}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
              {learnSkills.map((skill) => (
                <span
                  key={`preview-learn-${skill.skillId}`}
                  className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}