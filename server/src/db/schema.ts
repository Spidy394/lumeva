import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  pgEnum,
  uniqueIndex,
  index,
  primaryKey
} from "drizzle-orm/pg-core";

/* ================================
   ENUMS
================================ */

export const skillTypeEnum = pgEnum("skill_type", [
  "TEACH",
  "LEARN",
]);

export const swipeDirectionEnum = pgEnum("swipe_direction", [
  "LEFT",
  "RIGHT",
]);

/* ================================
   USERS (Better Auth compatible)
================================ */

export const users = pgTable("users", {
  id: text("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),

  bio: text("bio"),
  avatarUrl: text("avatar_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================================
   SESSIONS (Better Auth)
================================ */

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),

  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

/* ================================
   ACCOUNTS (Better Auth)
================================ */

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),

  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

/* ================================
   VERIFICATIONS (Better Auth)
================================ */

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

/* ================================
   SKILLS
================================ */

export const skills = pgTable("skills", {
  id: text("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ================================
   USER_SKILLS (Many-to-Many)
================================ */

export const userSkills = pgTable(
  "user_skills",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    skillId: text("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),

    type: skillTypeEnum("type").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.skillId, table.type] }),
    index("user_skills_user_idx").on(table.userId),
    index("user_skills_skill_idx").on(table.skillId),
  ]
);

/* ================================
   SWIPES
================================ */

export const swipes = pgTable(
  "swipes",
  {
    id: text("id").primaryKey(),

    swiperId: text("swiper_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    targetId: text("target_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    direction: swipeDirectionEnum("direction").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("unique_swipe_idx").on(table.swiperId, table.targetId),
    index("swipes_swiper_idx").on(table.swiperId),
    index("swipes_target_idx").on(table.targetId),
  ]
);

/* ================================
   MATCHES
================================ */

export const matches = pgTable(
  "matches",
  {
    id: text("id").primaryKey(),

    user1Id: text("user1_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    user2Id: text("user2_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("unique_match_idx").on(table.user1Id, table.user2Id),
    index("matches_user1_idx").on(table.user1Id),
    index("matches_user2_idx").on(table.user2Id),
  ]
);
