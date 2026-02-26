"use client";

import { motion } from "framer";
import Link from "next/link";
import { useState } from "react";

type Props = {
  type: "login" | "register";
};

export default function AuthCard({ type }: Props) {
  const isLogin = type === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-700 px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-white"
      >
        <h1 className="text-3xl font-semibold mb-8 text-center">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h1>

        <div className="space-y-5">

          {!isLogin && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 focus:outline-none"
          />

          <button className="w-full py-3 bg-white text-violet-700 font-semibold rounded-xl hover:opacity-90 transition">
            {isLogin ? "Login" : "Register"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-white/80">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="underline font-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline font-medium"
              >
                Login
              </Link>
            </>
          )}
        </div>

      </motion.div>
    </div>
  );
}