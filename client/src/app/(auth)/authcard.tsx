"use client";

import { useState } from "react";
import { motion } from "framer";
import Link from "next/link";

type Props = {
  mode: "login" | "register";
};

export default function Auth({ mode }: Props) {
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">

      {/* 🔥 BRANDING */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <span className="text-5xl font-semibold tracking-tight text-violet-600">
          Lumeva
        </span>
      </motion.div>

      {/* AUTH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border"
      >
        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin
              ? "Login to continue building."
              : "Start building with matched collaborators."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
          />

          <button className="w-full py-3 bg-black text-white rounded-xl text-sm font-medium hover:opacity-90 transition">
            {isLogin ? "Login" : "Create account"}
          </button>
        </div>

        {/* Switch */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link href="/register" className="text-black font-medium">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-black font-medium">
                Login
              </Link>
            </>
          )}
        </div>

      </motion.div>
    </div>
  );
}