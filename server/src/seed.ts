import { db } from "./config/db";
import { users, skills, userSkills } from "./db/schema";

const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Figma",
  "Graphic Design",
  "Photography",
  "Video Editing",
  "Machine Learning",
  "Data Science",
  "React Native",
  "Marketing",
  "Content Writing",
  "Spanish",
  "DevOps",
  "Public Speaking",
  "Product Management",
  "Music Production",
  "French",
];

// id => name
const SKILL_IDS: Record<string, string> = {};
SKILLS.forEach((name) => {
  SKILL_IDS[name] = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
});

const SEED_USERS = [
  {
    id: "seed-user-1",
    name: "Alex Chen",
    email: "alex.chen@lumeva.dev",
    bio: "Full-stack dev who loves clean UI. Looking to level up my design skills in exchange for solid React & TypeScript coaching.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen",
    teach: ["React", "TypeScript", "Node.js"],
    learn: ["UI/UX Design", "Figma", "Photography"],
  },
  {
    id: "seed-user-2",
    name: "Sofia Martinez",
    email: "sofia.martinez@lumeva.dev",
    bio: "Product designer with 4 years at early-stage startups. I can turn your idea into a polished Figma prototype — teach me to code it.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaMartinez",
    teach: ["UI/UX Design", "Figma", "Graphic Design"],
    learn: ["React", "Python", "TypeScript"],
  },
  {
    id: "seed-user-3",
    name: "Jordan Lee",
    email: "jordan.lee@lumeva.dev",
    bio: "Data scientist building ML models at a health-tech company. Want to learn web dev so I can ship my own side projects.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanLee",
    teach: ["Python", "Machine Learning", "Data Science"],
    learn: ["React", "TypeScript", "Marketing"],
  },
  {
    id: "seed-user-4",
    name: "Maya Patel",
    email: "maya.patel@lumeva.dev",
    bio: "Freelance photographer & video editor. Happy to teach visual storytelling — looking for someone to help me automate my workflow.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaPatel",
    teach: ["Photography", "Video Editing", "Graphic Design"],
    learn: ["Python", "TypeScript", "Node.js"],
  },
  {
    id: "seed-user-5",
    name: "Ethan Wright",
    email: "ethan.wright@lumeva.dev",
    bio: "DevOps / backend engineer. I keep systems running at scale — but my frontend skills are stuck in 2015. Time to fix that.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=EthanWright",
    teach: ["Node.js", "Python", "DevOps"],
    learn: ["React", "UI/UX Design", "Figma"],
  },
  {
    id: "seed-user-6",
    name: "Isabella Rosso",
    email: "isabella.rosso@lumeva.dev",
    bio: "Growth marketer and bilingual content creator (EN/ES). I'll help you grow — teach me to read a dashboard beyond vanity metrics.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=IsabellaRosso",
    teach: ["Marketing", "Content Writing", "Spanish"],
    learn: ["UI/UX Design", "Data Science", "Python"],
  },
  {
    id: "seed-user-7",
    name: "Liam Thompson",
    email: "liam.thompson@lumeva.dev",
    bio: "React Native dev shipping consumer apps. Want to add an ML layer to my apps — happy to mentor on mobile in return.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=LiamThompson",
    teach: ["React Native", "React", "TypeScript"],
    learn: ["Machine Learning", "Photography", "Marketing"],
  },
  {
    id: "seed-user-8",
    name: "Aisha Johnson",
    email: "aisha.johnson@lumeva.dev",
    bio: "Product manager and public speaker. I can help you think about your product and audience — looking to finally learn to code.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaJohnson",
    teach: ["Product Management", "Public Speaking", "Marketing"],
    learn: ["React", "Python", "Data Science"],
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. Insert skills (ignore conflicts — skill names are unique)
  console.log("  → Inserting skills...");
  await db
    .insert(skills)
    .values(
      SKILLS.map((name) => ({
        id: SKILL_IDS[name],
        name,
      }))
    )
    .onConflictDoNothing();

  // 2. Insert users
  console.log("  → Inserting users...");
  await db
    .insert(users)
    .values(
      SEED_USERS.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        emailVerified: false,
        bio: u.bio,
        avatarUrl: u.avatarUrl,
        image: u.avatarUrl,
      }))
    )
    .onConflictDoNothing();

  // 3. Insert user_skills
  console.log("  → Inserting user skills...");
  const userSkillRows = SEED_USERS.flatMap((u) => [
    ...u.teach.map((skill) => ({
      userId: u.id,
      skillId: SKILL_IDS[skill],
      type: "TEACH" as const,
    })),
    ...u.learn.map((skill) => ({
      userId: u.id,
      skillId: SKILL_IDS[skill],
      type: "LEARN" as const,
    })),
  ]);

  await db.insert(userSkills).values(userSkillRows).onConflictDoNothing();

  console.log(`✅ Seeded ${SEED_USERS.length} users, ${SKILLS.length} skills`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
